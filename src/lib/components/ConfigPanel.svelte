<script lang="ts">
	import Switch from './shared/Switch.svelte';
	import type { Reciter } from '$lib/classes/Reciter';
	import type { Translation } from '$lib/classes/Translation';
	import AyahSelector from './shared/AyahSelector.svelte';
	import ReciterSelector from './shared/ReciterSelector.svelte';
	import TextInput from './shared/TextInput.svelte';
	import TranslationSelector from './shared/TranslationSelector.svelte';

	let containerId: string = $state('ayah-widget');
	let surah: number = $state(2);
	let ayah: number = $state(255);
	let translations: Translation[] = $state([]);
	let theme: 'light' | 'dark' = $state('light');
	let enableAudio: boolean = $state(true);
	let enableWbwTranslation: boolean = $state(false);
	let showTranslatorName: boolean = $state(false);
	let showQuranLink: boolean = $state(true);
	let reciter: number | null = $state(7);
</script>

<div class="h-full w-full border-gray-400 border-2 rounded-lg p-4 min-w-[300px] overflow-auto">
	<h2 class="text-2xl font-semibold mb-4">Configuration</h2>

	<TextInput label="Container Id" bind:value={containerId} />

	<AyahSelector bind:surah bind:ayah />

	<TranslationSelector bind:translations />

	<ReciterSelector bind:reciter />

	<div class="flex flex-col mb-4 mt-4">
		<label class="mb-2 font-medium text-gray-700" for="theme-select">Theme</label>
		<select
			id="theme-select"
			bind:value={theme}
			class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
		</select>
	</div>

	<div class="flex flex-col space-y-3">
		<Switch label="Enable audio" bind:checked={enableAudio} id="enable-audio" />
		<Switch label="Enable wbw translation" bind:checked={enableWbwTranslation} id="enable-wbw" />
		<Switch label="Show translator name" bind:checked={showTranslatorName} id="show-translator" />
		<Switch
			label="Show Quran.com link under preview"
			bind:checked={showQuranLink}
			id="show-quran-link"
		/>
	</div>
</div>
