<script lang="ts">
	import { preferences } from '$lib/runes/main.svelte';

	let widgetContainer: HTMLDivElement;
	let isLoading = $state(false);

	async function loadWidget() {
		if (!widgetContainer) return;

		const target = widgetContainer.querySelector(`#${preferences.containerId}`);
		if (!target) return;

		isLoading = true;
		target.innerHTML =
			'<div style="padding: 20px; text-align: center; color: #666;">Loading Quran verse...</div>';

		// Build API URL
		const apiUrl = new URL('/api/widget', window.location.origin);
		apiUrl.searchParams.set('ayah', `${preferences.surah}:${preferences.ayah}`);
		apiUrl.searchParams.set('translations', preferences.translations.map((t) => t.id).join(','));
		apiUrl.searchParams.set('reciter', preferences.reciter?.toString() || '7');
		apiUrl.searchParams.set('audio', preferences.enableAudio.toString());
		apiUrl.searchParams.set('wbw', preferences.enableWbwTranslation.toString());
		apiUrl.searchParams.set('theme', preferences.theme);
		apiUrl.searchParams.set('showTranslatorNames', preferences.showTranslatorName.toString());
		apiUrl.searchParams.set('showQuranLink', preferences.showQuranLink.toString());

		try {
			const response = await fetch(apiUrl.toString());
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();

			if (data.success && data.html) {
				target.innerHTML = data.html;
			} else {
				throw new Error(data.error || 'Failed to load widget');
			}
		} catch (error) {
			console.error('Error loading widget:', error);
			target.innerHTML =
				'<div style="padding: 20px; background-color: #fee; border: 1px solid #fcc; border-radius: 4px; color: #c33;">Error loading Quran verse. Please try again later.</div>';
		} finally {
			isLoading = false;
		}
	}

	// Load widget when preferences change
	$effect(() => {
		// Track all preferences to trigger reload
		preferences.surah;
		preferences.ayah;
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
