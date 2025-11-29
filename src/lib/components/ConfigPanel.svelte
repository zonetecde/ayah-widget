<script lang="ts">
	import Switch from './shared/Switch.svelte';
	import AyahSelector from './shared/AyahSelector.svelte';
	import ReciterSelector from './shared/ReciterSelector.svelte';
	import TextInput from './shared/TextInput.svelte';
	import TranslationSelector from './shared/TranslationSelector.svelte';
	import { preferences } from '$lib/runes/main.svelte';
</script>

<div class="h-full w-full border-gray-400 border-2 rounded-lg p-4 min-w-[300px] overflow-auto">
	<h2 class="text-2xl font-semibold mb-4">Configuration</h2>

	<TextInput label="Container Id" bind:value={preferences.containerId} />

	<AyahSelector bind:surah={preferences.selectedSurah} bind:ayah={preferences.selectedAyah} />

	<TranslationSelector bind:translations={preferences.translations} />

	<ReciterSelector bind:reciter={preferences.reciter} />

	<div class="flex flex-col mt-2">
		<label class="mb-2 font-medium text-gray-700" for="theme-select">Theme</label>
		<select
			id="theme-select"
			bind:value={preferences.theme}
			class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
		</select>
	</div>

	<div class="flex flex-col space-y-1 mt-2">
		<label class="mb-2 font-medium text-gray-700" for="theme-select">Customization</label>

		<Switch label="Enable audio" bind:checked={preferences.enableAudio} id="enable-audio" />

		<Switch
			label="Enable wbw translation"
			bind:checked={preferences.enableWbwTranslation}
			id="enable-wbw"
		/>
		<Switch
			label="Show translator name"
			bind:checked={preferences.showTranslatorName}
			id="show-translator"
		/>
		<Switch
			label="Show Quran.com link under preview"
			bind:checked={preferences.showQuranLink}
			id="show-quran-link"
		/>
	</div>

	<div class="flex flex-col space-y-1 mt-2">
		<label class="mb-2 font-medium text-gray-700" for="theme-select">Advanced settings</label>

		<!-- Width and height inputs -->
		<Switch label="Use custom size" bind:checked={preferences.hasCustomSize} id="use-custom-size" />

		<div class="flex flex-col space-y-2 mt-2" class:opacity-50={!preferences.hasCustomSize}>
			<section
				class="grid grid-cols-2 gap-2"
				class:pointer-events-none={!preferences.hasCustomSize}
			>
				<div class="flex flex-col">
					<label class="mb-2 font-medium text-sm text-gray-700" for="width-input">Width</label>
					<input
						type="text"
						placeholder="Width (e.g., 100%, 400px)"
						bind:value={preferences.customSize.width}
						class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div class="flex flex-col">
					<label class="mb-2 font-medium text-sm text-gray-700" for="height-input">Max Height</label
					>
					<input
						type="text"
						placeholder="Height (e.g., 400px, 50vh)"
						bind:value={preferences.customSize.height}
						class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</section>
		</div>
	</div>
</div>
