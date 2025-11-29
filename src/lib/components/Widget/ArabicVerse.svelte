<script lang="ts">
	import type WidgetProps from './WidgetProps';

	let { verse, options, colors }: WidgetProps = $props();
</script>

<!-- Display simple Arabic text without word by word -->
<div
	data-verse-text
	data-verse-key={verse.verse_key}
	data-surah-name={options.surahName}
	data-arabic-verse={verse.text_uthmani}
	style="
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 0px;
          direction: rtl;
          text-align: right;
          font-size: 32px;
          line-height: 1.5;
          font-family: 'UthmanicHafs', 'Traditional Arabic', 'Arabic Typesetting', 'Scheherazade', serif;
        "
>
	{#each verse.words as word}
		{#if word.char_type_name === 'word'}
			<div
				style="
                display: inline-flex;
                flex-direction: column;
                align-items: center;
              "
			>
				<div
					style="
                  font-size: 32px;
                  font-family: 'UthmanicHafs', 'Traditional Arabic', 'Arabic Typesetting', 'Scheherazade', serif;
                "
				>
					{word.text_uthmani}
				</div>
				{#if options.enableWbw && word.translation?.text}
					<div
						style="
                    font-size: 11px;
                    color: {colors!.secondaryText};
                    text-align: center;
                    white-space: nowrap;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  "
					>
						{word.translation.text}
					</div>
				{/if}
			</div>
		{/if}
	{/each}
</div>
