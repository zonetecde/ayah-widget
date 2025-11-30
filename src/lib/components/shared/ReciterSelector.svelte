<script lang="ts">
	import { Reciter } from '$lib/classes/Reciter';
	import { globalState } from '$lib/runes/main.svelte';
	import { onMount } from 'svelte';

	let { reciter = $bindable() }: { reciter: number | null } = $props();

	const selectedReciter: Reciter | null = $derived(
		globalState.availableReciters.find((r) => r.id === reciter) ?? null
	);

	const hasReciters = $derived(globalState.availableReciters.length > 0);

	onMount(() => {
		if (globalState.availableReciters.length === 0) {
			globalState.loadReciters().then(() => {
				// If there was an error during loading, add Mishary Alafasy as a default reciter (7)
				if (globalState.availableReciters.length === 0) {
					globalState.availableReciters = [new Reciter({ id: 7, name: 'Mishary Alafasy' })];
				}
			});
		}
	});
</script>

<div class="flex flex-col mb-2 space-y-2">
	<label class="font-medium text-gray-700" for="reciter">Reciter</label>
	{#if !hasReciters}
		<div
			class="border border-dashed border-gray-300 rounded px-3 py-2 text-sm text-gray-500 bg-gray-50"
		>
			Loading reciters...
		</div>
	{:else}
		<select
			id="reciter"
			name="reciter"
			class="border border-gray-300 rounded px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
			bind:value={reciter}
		>
			<option value={null}>Select reciter</option>
			{#each globalState.availableReciters as r (r.id)}
				<option value={r.id}>{r.name}</option>
			{/each}
		</select>
	{/if}
</div>
