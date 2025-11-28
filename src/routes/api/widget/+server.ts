import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { render } from 'svelte/server';
import QuranWidget from '$lib/components/QuranWidget.svelte';
import type { Verse, WidgetOptions } from '$lib/types/quran';

const API_BASE = 'https://api.quran.com/api/v4';

export const GET: RequestHandler = async ({ url }) => {
	// Get request parameters
	const ayah = url.searchParams.get('ayah') || '33:56';
	const translationIds = url.searchParams.get('translations');
	const reciterId = url.searchParams.get('reciter') || '7';
	const enableAudio = url.searchParams.get('audio') === 'true';
	const enableWbw = url.searchParams.get('wbw') === 'true';
	const theme = (url.searchParams.get('theme') || 'light') as 'light' | 'dark';
	const showTranslatorNames = url.searchParams.get('showTranslatorNames') === 'true';
	const showQuranLink = url.searchParams.get('showQuranLink') === 'true';

	try {
		// Build Quran.com API URL
		const apiUrl = new URL(`${API_BASE}/verses/by_key/${ayah}`);
		apiUrl.searchParams.set('words', 'true');
		apiUrl.searchParams.set('language', 'en');
		apiUrl.searchParams.set('fields', 'text_uthmani');
		apiUrl.searchParams.set('translations', translationIds || '');
		apiUrl.searchParams.set('audio', reciterId);
		apiUrl.searchParams.set(
			'word_fields',
			'verse_key,location,text_uthmani,translation,transliteration,audio_url'
		);

		// Fetch from Quran.com API
		const response = await fetch(apiUrl.toString());
		if (!response.ok) {
			throw new Error(`API error: ${response.status}`);
		}

		const data = await response.json();
		const verse: Verse = data.verse;

		// Fix a problem with the font rendering some sukun characters incorrectly
		const weirdSukunRegex = /[\u06DF\u06E1\u06E2\u06E3\u06E4]/g;
		verse.text_uthmani = verse.text_uthmani.replace(weirdSukunRegex, '\u0652');
		for (const word of verse.words ?? []) {
			word.text_uthmani = word.text_uthmani.replace(weirdSukunRegex, '\u0652');
		}

		// Remove the footnote markers from the translations
		for (const t of verse.translations ?? []) {
			// rem <sup ...>...</sup> tags
			t.text = t.text.replace(/<sup[^>]*>.*?<\/sup>/g, '');
		}

		// Enrich translations with their human-readable names
		const translationResourceIds = (verse.translations ?? [])
			.map((t) => t.resource_id)
			.filter((id) => Number.isFinite(id));

		if (translationResourceIds.length && verse.translations?.length) {
			const translationsMetaRes = await fetch(`${API_BASE}/resources/translations`);
			if (translationsMetaRes.ok) {
				const translationsMeta = await translationsMetaRes.json();
				const metaById = new Map<number, any>();
				const translationIdSet = new Set(translationResourceIds);
				for (const meta of translationsMeta.translations as any[]) {
					if (translationIdSet.has(meta.id)) {
						metaById.set(meta.id, meta);
					}
				}

				verse.translations = verse.translations.map((t) => {
					const meta = metaById.get(t.resource_id);
					const resource_name = meta?.name || meta?.author_name || meta?.resource_name;
					return {
						...t,
						resource_name,
						name: meta?.name ?? t.name,
						author_name: meta?.author_name ?? t.author_name
					};
				});
			} else {
				console.warn(`Translations API error: ${translationsMetaRes.status}`);
			}
		}

		console.log(JSON.stringify(verse));

		// Fetch chapter information to include the surah name (phonetic)
		const surahNumber = verse.chapter_id || Number.parseInt(ayah.split(':')[0] || '0', 10);
		let surahName: string | undefined;

		if (Number.isFinite(surahNumber) && surahNumber > 0) {
			const chapterResponse = await fetch(`${API_BASE}/chapters/${surahNumber}?language=en`);
			if (chapterResponse.ok) {
				const chapterData = await chapterResponse.json();
				surahName = chapterData?.chapter?.name_simple as string | undefined;
			} else {
				console.warn(`Chapter API error: ${chapterResponse.status}`);
			}
		}

		// Widget options
		const options: WidgetOptions = {
			enableAudio,
			enableWbw,
			theme,
			showTranslatorNames,
			showQuranLink,
			ayah,
			hasAnyTranslations: translationResourceIds.length > 0,
			surahName
		};

		// Render Svelte component server-side with svelte/server
		const result = render(QuranWidget, { props: { verse, options } });
		const html = result.body;

		return json({ html, success: true });
	} catch (error) {
		console.error('Error fetching verse:', error);
		return json(
			{
				html: '<div style="color: red; padding: 20px;">Error loading verse. Please try again.</div>',
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
};
