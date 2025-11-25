<script lang="ts">
	import type { Translation } from '$lib/classes/Translation';
	import { globalState } from '$lib/runes/main.svelte';
	import { onMount } from 'svelte';

	let {
		translations = $bindable()
	}: {
		translations?: Translation[];
	} = $props();

	let searchQuery = $state('');

	onMount(() => {
		if (globalState.availableTranslations.length === 0) {
			globalState.loadTranslations().then(() => {
				const defaultTranslation = globalState.availableTranslations.find((t) => t.id === 20);
				if (defaultTranslation && translations) {
					translations = [defaultTranslation];
				}
			});
		}
	});

	// Group translations by language
	$effect.pre(() => {
		// Trigger reactivity when availableTranslations changes
		globalState.availableTranslations;
	});

	function getGroupedAndFiltered() {
		const filtered = globalState.availableTranslations.filter(
			(t) =>
				t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				t.author_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				t.language_name.toLowerCase().includes(searchQuery.toLowerCase())
		);

		const grouped = filtered.reduce(
			(acc, translation) => {
				if (!acc[translation.language_name]) {
					acc[translation.language_name] = [];
				}
				acc[translation.language_name].push(translation);
				return acc;
			},
			{} as Record<string, Translation[]>
		);

		return grouped;
	}

	function toggleTranslation(translation: Translation) {
		if (!translations) {
			translations = [];
		}
		const index = translations.findIndex((t) => t.id === translation.id);
		if (index > -1) {
			translations.splice(index, 1);
		} else {
			translations.push(translation);
		}
		translations = translations; // Trigger reactivity
	}

	function isSelected(translation: Translation): boolean {
		return translations?.some((t) => t.id === translation.id) ?? false;
	}

	const groupedTranslations = $derived(getGroupedAndFiltered());
</script>

<div class="flex flex-col mb-2">
	<label class="mb-1 font-medium text-xs text-gray-700" for="translation-selector"
		>Select Translations</label
	>
	<div id="translation-selector" class="flex flex-col space-y-1 w-full">
		{#if globalState.availableTranslations.length === 0}
			<span class="text-gray-500 text-xs">Loading Translations...</span>
		{:else}
			<!-- Search input -->
			<input
				type="text"
				placeholder="Search translations..."
				bind:value={searchQuery}
				class="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
			/>

			<!-- Selected translations display -->
			{#if translations && translations.length > 0}
				<div class="flex flex-wrap gap-1">
					{#each translations as translation (translation.id)}
						<div
							class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs flex items-center gap-1"
						>
							<span class="truncate">{translation.name}</span>
							<button
								onclick={() => toggleTranslation(translation)}
								class="text-blue-600 hover:text-blue-900 font-bold leading-none"
								type="button"
							>
								×
							</button>
						</div>
					{/each}
				</div>
			{/if}

			<!-- Translations list grouped by language -->
			<div class="border border-gray-300 rounded max-h-48 overflow-y-auto text-xs">
				{#each Object.entries(groupedTranslations) as [language, translationsList] (language)}
					<div>
						<div class="sticky top-0 bg-gray-200 px-2 py-1 font-semibold text-gray-800 text-xs">
							{language.charAt(0).toUpperCase() + language.slice(1)}
						</div>
						<div class="divide-y">
							{#each translationsList as translation (translation.id)}
								<label class="flex items-center px-2 py-1 hover:bg-gray-50 cursor-pointer">
									<input
										type="checkbox"
										checked={isSelected(translation)}
										onchange={() => toggleTranslation(translation)}
										class="mr-2 cursor-pointer"
									/>
									<div class="flex flex-col flex-1 min-w-0">
										<span class="font-medium text-gray-900 text-xs truncate"
											>{translation.name}</span
										>
										<span class="text-xs text-gray-600 truncate">{translation.author_name}</span>
									</div>
								</label>
							{/each}
						</div>
					</div>
				{/each}
			</div>

			{#if Object.keys(groupedTranslations).length === 0}
				<span class="text-gray-500 text-center py-2 text-xs">No translations match your search</span
				>
			{/if}
		{/if}
	</div>
</div>
