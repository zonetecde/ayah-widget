<script lang="ts">
	import { preferences } from '$lib/runes/main.svelte';
	import { onMount } from 'svelte';

	let widgetContainer: HTMLDivElement;

	onMount(() => {
		// Load the quran-embed.js script
		const script = document.createElement('script');
		script.src = '/quran-embed.js';
		script.setAttribute('data-quran-target', preferences.containerId);
		script.setAttribute('data-quran-ayah', `${preferences.surah}:${preferences.ayah}`);
		script.setAttribute(
			'data-quran-translation-ids',
			preferences.translations.map((t) => t.id).join(',')
		);
		script.setAttribute('data-quran-reciter-id', preferences.reciter?.toString() || '');
		script.setAttribute('data-quran-audio', preferences.enableAudio.toString());
		script.setAttribute('data-quran-word-by-word', preferences.enableWbwTranslation.toString());
		script.setAttribute('data-quran-theme', preferences.theme);
		script.setAttribute(
			'data-quran-show-translator-names',
			preferences.showTranslatorName.toString()
		);
		script.setAttribute('data-quran-show-quran-link', preferences.showQuranLink.toString());
		script.async = true;

		widgetContainer.appendChild(script);

		return () => {
			// Cleanup: remove script when component unmounts
			if (script.parentNode) {
				script.parentNode.removeChild(script);
			}
		};
	});

	// Reactive effect to update the widget when preferences change
	$effect(() => {
		// Trigger re-render when preferences change
		const target = document.getElementById(preferences.containerId);
		if (target) {
			// Clear and re-initialize the widget
			target.innerHTML = '';

			// Update script attributes
			const scripts = widgetContainer.querySelectorAll('script');
			scripts.forEach((script) => {
				script.setAttribute('data-quran-target', preferences.containerId);
				script.setAttribute('data-quran-ayah', `${preferences.surah}:${preferences.ayah}`);
				script.setAttribute(
					'data-quran-translation-ids',
					preferences.translations.map((t) => t.id).join(',')
				);
				script.setAttribute('data-quran-reciter-id', preferences.reciter?.toString() || '');
				script.setAttribute('data-quran-audio', preferences.enableAudio.toString());
				script.setAttribute('data-quran-word-by-word', preferences.enableWbwTranslation.toString());
				script.setAttribute('data-quran-theme', preferences.theme);
				script.setAttribute(
					'data-quran-show-translator-names',
					preferences.showTranslatorName.toString()
				);
				script.setAttribute('data-quran-show-quran-link', preferences.showQuranLink.toString());
			});
		}
	});
</script>

<div class="h-full w-full border-gray-400 border-2 rounded-lg p-4 min-w-[300px]">
	<h2 class="text-2xl font-semibold mb-4">Live Preview</h2>
	<div bind:this={widgetContainer}>
		<div id={preferences.containerId}></div>
	</div>
</div>
