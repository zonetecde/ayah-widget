<script lang="ts">
	import ConfigPanel from '$lib/components/ConfigPanel.svelte';
	import IntegrationCode from '$lib/components/IntegrationCode.svelte';
	import LivePreview from '$lib/components/LivePreview.svelte';
</script>

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
