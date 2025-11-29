<script lang="ts">
	import type WidgetProps from './WidgetProps';

	let { verse, options, colors }: WidgetProps = $props();

	const translationCount = verse.translations?.length || 0;
</script>

<div style="margin-top: 12px;" data-translations>
	{#if translationCount > 0 && verse.translations}
		{#each verse.translations as translation}
			<div
				style="
              padding: 16px 0;
              border-top: 1px solid {colors!.borderColor};
            "
			>
				<div
					data-translation-text
					style="
                font-size: 16px;
                line-height: 1.75;
                color: {colors!.textColor};
                margin-bottom: {options.showTranslatorNames ? '8px' : '0'};
              "
				>
					{@html translation.text}
				</div>
				{#if options.showTranslatorNames}
					<div
						style="
                  font-size: 13px;
                  color: {colors!.secondaryText};
                  margin-top: 8px;
                "
					>
						— {translation.resource_name}
					</div>
				{/if}
			</div>
		{/each}
	{/if}
</div>
