<script lang="ts">
	import type WidgetProps from './WidgetProps';

	let { verse, options, colors }: WidgetProps = $props();
</script>

<div
	data-verse-text
	data-verse-key={verse.verseKey}
	data-surah-name={options.surahName}
	data-verse-number={verse.verseNumber}
	data-arabic-verse={verse.textUthmani}
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
	{#each verse.words || [] as word}
		{#if word.charTypeName === 'word'}
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
					{word.text}
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
