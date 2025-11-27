<script lang="ts">
	import { Surah } from '$lib/classes/Surah';
	import { globalState } from '$lib/runes/main.svelte';
	import { onMount } from 'svelte';

	let selectedSurah: Surah | null = $state(null);

	let {
		surah = $bindable(),
		ayah = $bindable()
	}: {
		surah: number;
		ayah: number;
	} = $props();

	onMount(() => {
		if (globalState.surahs.length === 0) {
			surah = 2;
			ayah = 255;
			globalState.loadSurahs().then(() => {
				selectedSurah = globalState.surahs[1];
			});
		} else {
			// Initialize selectedSurah based on current surah value
			selectedSurah = globalState.surahs.find((s) => s.id === surah) || globalState.surahs[1];
		}
	});

	// Update surah when selectedSurah changes, but avoid infinite loops
	$effect(() => {
		if (selectedSurah && selectedSurah.id !== surah) {
			surah = selectedSurah.id;
		}
	});
</script>

<div class="flex flex-col mb-4">
	<label class="mb-2 font-medium text-gray-700" for="ayah-selector">Select Ayah</label>
	<div id="ayah-selector" class="flex space-x-2">
		{#if globalState.surahs.length === 0}
			<span class="text-gray-500">Loading Surahs...</span>
		{:else}
			<div class="grid grid-cols-2 gap-x-2">
				<select
					bind:value={selectedSurah}
					class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option disabled selected value={null}>Select Surah</option>
					{#each globalState.surahs as surah}
						<option value={surah}>{surah.id} - {surah.name_simple}</option>
					{/each}
				</select>

				<select
					bind:value={ayah}
					class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					{#if selectedSurah === null}
						<option disabled selected value={null}>Select Ayah</option>
					{:else}
						{#each Array(selectedSurah.verses_count)
							.fill(0)
							.map((_, i) => i + 1) as ayahNum}
							<option value={ayahNum}>{ayahNum}</option>
						{/each}
					{/if}
				</select>
			</div>
		{/if}
	</div>
</div>
