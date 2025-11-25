<script lang="ts">
	let {
		label,
		value = $bindable()
	}: {
		label: string;
		value?: string;
	} = $props();
</script>

<div class="flex flex-col mb-4">
	<label class="mb-2 font-medium text-gray-700" for={label}>{label}</label>
	<input
		id={label}
		type="text"
		bind:value
		class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
	/>
</div>
