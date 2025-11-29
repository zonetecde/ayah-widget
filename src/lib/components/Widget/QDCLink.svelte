<script lang="ts">
	import type WidgetProps from './WidgetProps';

	let { verse, options, colors }: WidgetProps = $props();

	const translationCount = verse.translations?.length || 0;
</script>

<div
	style="
        padding: 12px 16px;
        background-color: {colors!.secondaryBg};
        border-top: 1px solid {colors!.borderColor};
        text-align: center;
      "
>
	<a
		href="https://quran.com/{options.ayah}"
		target="_blank"
		rel="noopener noreferrer"
		style="
          color: {colors!.linkColor};
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        "
	>
		<span>View on Quran.com</span>
		<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
			<path
				d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
			/>
			<path
				d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
			/>
		</svg>
	</a>
</div>
