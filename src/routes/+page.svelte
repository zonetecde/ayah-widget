<script lang="ts">
	import ConfigPanel from '$lib/components/ConfigPanel.svelte';
	import IntegrationCode from '$lib/components/IntegrationCode.svelte';
	import LivePreview from '$lib/components/LivePreview.svelte';

	let isMobile = $state(false);

	// Détecter les changements de taille d'écran
	$effect(() => {
		const handleResize = () => {
			isMobile = window.innerWidth < 1200;
		};

		handleResize(); // Vérifier au chargement
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<!-- Mobile: Vertical stack -->
{#if isMobile}
	<div class="w-full h-full flex flex-col gap-y-2 overflow-y-auto">
		<section class="min-h-max">
			<LivePreview />
		</section>
		<section class="min-h-max">
			<ConfigPanel />
		</section>
		<section class="h-1/3 min-h-max">
			<IntegrationCode />
		</section>
	</div>
{:else}
	<!-- Desktop: Horizontal layout -->
	<div class="w-full h-full flex flex-row gap-x-4">
		<div class="w-1/4 h-full">
			<ConfigPanel />
		</div>
		<div class="w-3/4 h-full flex flex-col">
			<section class="h-4/5">
				<LivePreview />
			</section>
			<section class="h-1/5 mt-4">
				<IntegrationCode />
			</section>
		</div>
	</div>
{/if}
