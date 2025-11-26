<script lang="ts">
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
	let reciter: number | null = $state(7);
</script>

<div class="h-full w-full border-gray-400 border-2 rounded-lg p-4 min-w-[300px]">
	<h2 class="text-2xl font-semibold mb-4">Configuration</h2>

	<TextInput label="Container Id" bind:value={containerId} />

	<AyahSelector bind:surah bind:ayah />

	<TranslationSelector bind:translations />

	<ReciterSelector bind:reciter />
</div>
