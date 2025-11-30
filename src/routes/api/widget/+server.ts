import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { render } from 'svelte/server';
import QuranWidget from '$lib/components/Widget/QuranWidget.svelte';
import type { WidgetOptions } from '$lib/types/quran';
import { QuranApiClient } from '$lib/server/quranApiClient';
import type { ChapterId, VerseKey } from '@quranjs/api';

const API_BASE = 'https://api.quran.com/api/v4';
const SUKUN_VARIANTS = /[\u06DF\u06E1\u06E2\u06E3\u06E4]/g;
const FOOTNOTE_TAGS = /<sup[^>]*>.*?<\/sup>/g;

const normalizeSukun = (text?: string | null) =>
	text ? text.replace(SUKUN_VARIANTS, '\u0652') : text;
const parseTranslationIds = (raw: string | null) =>
	raw
		?.split(',')
		.map((id) => id.trim())
		.filter(Boolean) ?? [];

const fetchVerseWords = async (ayah: string, translationIds: string[], reciterId: number) => {
	const apiUrl = new URL(`${API_BASE}/verses/by_key/${ayah}`);
	apiUrl.searchParams.set('words', 'true');
	apiUrl.searchParams.set('language', 'en');
	apiUrl.searchParams.set('fields', 'text_uthmani');
	apiUrl.searchParams.set('translations', translationIds.join(','));
	apiUrl.searchParams.set('audio', String(reciterId));
	apiUrl.searchParams.set(
		'word_fields',
		'verse_key,location,text_uthmani,translation,transliteration,audio_url'
	);

	const res = await fetch(apiUrl);
	if (!res.ok) return null;
	const data = await res.json();
	return data?.verse?.words as any[] | null;
};

export const GET: RequestHandler = async ({ url }) => {
	const ayah = url.searchParams.get('ayah') || '33:56';
	const translationIds = parseTranslationIds(url.searchParams.get('translations'));
	const reciterId = Number(url.searchParams.get('reciter') || '7');
	const enableAudio = url.searchParams.get('audio') === 'true';
	const enableWbw = url.searchParams.get('wbw') === 'true';
	const theme = (url.searchParams.get('theme') || 'light') as 'light' | 'dark';
	const showTranslatorNames = url.searchParams.get('showTranslatorNames') === 'true';
	const showQuranLink = url.searchParams.get('showQuranLink') === 'true';
	const customWidth = url.searchParams.get('width') || undefined;
	const customHeight = url.searchParams.get('height') || undefined;

	try {
		const client = QuranApiClient.getInstance();

		const verse = await client.verses.findByKey(ayah as VerseKey, {
			reciter: reciterId,
			words: true,
			wordFields: {
				textUthmani: true,
				location: true,
				verseKey: true
			},

			translations: translationIds,

			fields: { textUthmani: true },
			translationFields: { resourceName: true, languageName: true }
		});

		console.log('VERSE', verse);

		const test = await client.audio.findVerseRecitationsByChapter('1', '11');
		console.log('TEST', test);

		verse.textUthmani = normalizeSukun(verse.textUthmani) ?? undefined;

		const apiWords = await fetchVerseWords(ayah, translationIds, reciterId);
		const wordsSource = apiWords && apiWords.length > 0 ? apiWords : verse.words;
		verse.words =
			(wordsSource
				?.map((word, idx) => {
					const charTypeName = word.charTypeName ?? word.char_type_name ?? '';
					if (charTypeName !== 'word') return null;

					const text = normalizeSukun(word.text_uthmani ?? word.textUthmani ?? word.text ?? '');

					return {
						...word,
						id: word.id ?? idx + 1,
						position: word.position ?? idx + 1,
						audioUrl: word.audio_url ?? word.audioUrl ?? null,
						verseKey: word.verse_key ?? word.verseKey,
						charTypeName: charTypeName || 'word',
						text: text ?? ''
					};
				})
				.filter(Boolean) as any[]) ?? [];

		for (const translation of verse.translations ?? []) {
			translation.text = translation.text.replace(FOOTNOTE_TAGS, '');
			const resourceName =
				(translation as any).resource_name ??
				(translation as any).resourceName ??
				(translation as any).translator_name ??
				(translation as any).author_name ??
				(translation as any).name;
			if (resourceName) {
				(translation as any).resource_name = resourceName;
			}
		}

		const surahNumber = Number.parseInt(verse.verseKey.split(':')[0] || '0', 10);
		const chapter =
			Number.isFinite(surahNumber) && surahNumber > 0
				? await client.chapters.findById(surahNumber as ChapterId)
				: undefined;

		// Widget options
		const options: WidgetOptions = {
			enableAudio,
			enableWbw,
			theme,
			showTranslatorNames,
			showQuranLink,
			ayah,
			hasAnyTranslations: (verse.translations ?? []).length > 0,
			surahName: chapter?.nameSimple,
			customWidth: customWidth,
			customHeight: customHeight
		};

		// Render Svelte component server-side with svelte/server
		const result = render(QuranWidget, { props: { verse: verse as any, options } });
		const html = result.body;

		return json(
			{ html, success: true },
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Cache-Control': 'max-age=60'
				}
			}
		);
	} catch (error) {
		console.error('Error fetching verse:', error);
		return json(
			{
				html: '<div style="color: red; padding: 20px;">Error loading verse. Please try again.</div>',
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error'
			},
			{
				status: 500,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Cache-Control': 'no-store'
				}
			}
		);
	}
};
