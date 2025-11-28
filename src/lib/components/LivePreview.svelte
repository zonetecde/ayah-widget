<script lang="ts">
	import { preferences } from '$lib/runes/main.svelte';

	let widgetContainer: HTMLDivElement;
	let scriptElement: HTMLScriptElement | null = null;

	function loadWidget() {
		if (!widgetContainer) return;

		// Remove previous script if exists
		if (scriptElement) {
			scriptElement.remove();
			scriptElement = null;
		}

		// Clear container
		const target = widgetContainer.querySelector(`#${preferences.containerId}`);
		if (target) {
			target.innerHTML = '';
		}

		// Create and inject script element with current preferences
		scriptElement = document.createElement('script');
		scriptElement.src = '/quran-embed.js';
		scriptElement.setAttribute('data-quran-target', preferences.containerId);
		scriptElement.setAttribute(
			'data-quran-ayah',
			`${preferences.selectedSurah}:${preferences.selectedAyah}`
		);
		scriptElement.setAttribute(
			'data-quran-translation-ids',
			preferences.translations.map((t) => t.id).join(',')
		);
		scriptElement.setAttribute('data-quran-reciter-id', preferences.reciter?.toString() || '7');
		scriptElement.setAttribute('data-quran-audio', preferences.enableAudio.toString());
		scriptElement.setAttribute(
			'data-quran-word-by-word',
			preferences.enableWbwTranslation.toString()
		);
		scriptElement.setAttribute('data-quran-theme', preferences.theme);
		scriptElement.setAttribute(
			'data-quran-show-translator-names',
			preferences.showTranslatorName.toString()
		);
		scriptElement.setAttribute('data-quran-show-quran-link', preferences.showQuranLink.toString());
		scriptElement.async = true;

		document.body.appendChild(scriptElement);
	}

	// Load widget when preferences change
	$effect(() => {
		// Track all preferences to trigger reload
		preferences.selectedSurah;
		preferences.selectedAyah;
		preferences.translations;
		preferences.reciter;
		preferences.enableAudio;
		preferences.enableWbwTranslation;
		preferences.theme;
		preferences.showTranslatorName;
		preferences.showQuranLink;

		loadWidget();
	});
</script>

<div class="h-full w-full border-gray-400 border-2 rounded-lg p-4 min-w-[300px] overflow-auto">
	<h2 class="text-2xl font-semibold mb-4">Live Preview</h2>
	<div bind:this={widgetContainer}>
		<div id={preferences.containerId}></div>
	</div>
</div>
