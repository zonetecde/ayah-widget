<script lang="ts">
	import { onMount } from 'svelte';
	import { API_BASE, globalState } from '$lib/runes/main.svelte';

	type VerseResponse = {
		verse: {
			text_uthmani?: string;
			translations?: { text: string }[];
		};
	};

	let loading = $state(false);
	let error: string | null = $state(null);
	let arabicText = $state('');
	let translationText = $state('');

	let abortController: AbortController | null = null;

	const translationIds = $derived(() =>
		globalState.translations.length > 0 ? globalState.translations.map((t) => t.id).join(',') : '20'
	);
	const verseKey = $derived(() => `${globalState.surah}:${globalState.ayah}`);
	const fetchKey = $derived(() => `${verseKey}|${translationIds}`);

	async function fetchVerse(key: string, translationsParam: string) {
		// Cancel any in-flight request to avoid overlaps
		if (abortController) {
			abortController.abort();
		}
		const controller = new AbortController();
		abortController = controller;

		loading = true;
		error = null;

		const url = `${API_BASE}/verses/by_key/${encodeURIComponent(
			key
		)}?language=en&fields=text_uthmani&translations=${translationsParam}`;

		try {
			const res = await fetch(url, { signal: controller.signal });
			if (!res.ok) {
				throw new Error(`API error ${res.status}`);
			}
			const data: VerseResponse = await res.json();
			arabicText = data.verse?.text_uthmani ?? '';
			translationText = data.verse?.translations?.[0]?.text ?? '';
		} catch (err: any) {
			if (err?.name === 'AbortError') {
				return;
			}
			console.error(err);
			error = 'Unable to load verse right now.';
			arabicText = '';
			translationText = '';
		} finally {
			if (!controller.signal.aborted) {
				loading = false;
			}
		}
	}

	let mounted = false;
	let lastKey = '';
	onMount(() => {
		mounted = true;
		lastKey = fetchKey;
		fetchVerse(verseKey, translationIds);
	});

	$effect(() => {
		if (!mounted) return;
		if (fetchKey === lastKey) return;
		lastKey = fetchKey;
		fetchVerse(verseKey, translationIds);
	});
</script>

<div class="h-full w-full border-gray-400 border-2 rounded-lg p-4 min-w-[300px]">
	<h2 class="text-2xl font-semibold mb-4">Live Preview</h2>

	{#if loading}
		<p class="text-gray-600">Loading verse...</p>
	{:else if error}
		<p class="text-red-600">{error}</p>
	{:else if arabicText || translationText}
		<div class="space-y-3">
			<p class="text-3xl leading-relaxed text-right font-semibold">{arabicText}</p>
			<p class="text-base leading-relaxed">{@html translationText}</p>
		</div>
	{:else}
		<p class="text-gray-600">Select an ayah to preview.</p>
	{/if}
</div>
