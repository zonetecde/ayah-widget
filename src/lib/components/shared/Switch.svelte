<script lang="ts">
	let {
		label,
		checked = $bindable(),
		id
	}: {
		label: string;
		checked?: boolean;
		id?: string;
	} = $props();

	const switchId = $derived(id ?? label.toLowerCase().replace(/\s+/g, '-'));
</script>

<div class="flex items-center justify-between border border-gray-200 rounded px-3 py-2">
	<label class="text-sm font-medium text-gray-700" for={switchId}>{label}</label>
	<input
		id={switchId}
		type="checkbox"
		bind:checked
		class="h-5 w-5 accent-blue-600 cursor-pointer"
	/>
</div>
