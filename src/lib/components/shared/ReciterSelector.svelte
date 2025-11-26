<script lang="ts">
	import type { Reciter } from '$lib/classes/Reciter';
	import { globalState } from '$lib/runes/main.svelte';
	import { onMount } from 'svelte';

	let { reciter = $bindable() } = $props();

	onMount(() => {
		if (globalState.availableReciters.length === 0) {
			globalState.loadReciters();
		}
	});
</script>

<div class="flex flex-col space-y-2">
	<label class="font-medium" for="reciter">Reciter</label>
	<input
		class="border border-gray-300 rounded px-2 py-1"
		type="number"
		name="reciter"
		bind:value={reciter}
	/>
</div>
<!-- 
    <div class="flex flex-col space-y-2">
        <label class="font-medium" for="reciter">Reciter</label>
        {#if globalState.availableReciters.length === 0}
            <span class="text-gray-500">Loading Reciters...</span>
        {:else}
            <select class="border border-gray-300 rounded px-2 py-1" name="reciter" bind:value={reciter}>
                <option value={null}>-- Select Reciter --</option>
                {#each globalState.availableReciters as r}
                    <option value={r}>{r.name}</option>
                {/each}
            </select>
        {/if}
    </div> -->
