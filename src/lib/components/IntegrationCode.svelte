<script lang="ts">
	import { preferences } from '$lib/runes/main.svelte';

	let codeSnippet = $derived(`<div id="${preferences.containerId}"></div>

<script
  src="https://ayah-widget.vercel.app/quran-embed.js"
  data-quran-target="${preferences.containerId}"
  data-quran-ayah="${preferences.selectedSurah}:${preferences.selectedAyah}"
  data-quran-translation-ids="${preferences.translations.map((t) => t.id).join(',')}"
  data-quran-reciter-id="${preferences.reciter || ''}"
  data-quran-audio="${preferences.enableAudio}"
  data-quran-word-by-word="${preferences.enableWbwTranslation}"
  data-quran-theme="${preferences.theme}"
  data-quran-show-translator-names="${preferences.showTranslatorName}"
  data-quran-show-quran-link="${preferences.showQuranLink}"
  async>
<\/script>`);

	function copyToClipboard() {
		navigator.clipboard.writeText(codeSnippet);
	}
</script>

<div class="h-full w-full border-gray-400 border-2 rounded-lg p-4 min-w-[300px] flex flex-col">
	<div class="flex justify-between items-center mb-4">
		<h2 class="text-lg font-semibold">Code</h2>
		<button
			onclick={copyToClipboard}
			class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
		>
			Copy
		</button>
	</div>
	<pre class="bg-gray-100 p-3 rounded text-xs overflow-x-auto overflow-y-auto"><code
			>{codeSnippet}</code
		></pre>
</div>
