<script lang="ts">
	import type { Verse, WidgetOptions } from '$lib/types/quran';
	import ArabicVerse from './ArabicVerse.svelte';
	import Header from './Header.svelte';
	import QDCLink from './QDCLink.svelte';
	import Translations from './Translations.svelte';
	import type WidgetProps from './WidgetProps';

	let { verse, options }: WidgetProps = $props();

	const isDark = options.theme === 'dark';

	let colors = {
		borderColor: isDark ? '#2d3748' : '#e2e8f0',
		linkColor: isDark ? '#60a5fa' : '#20a49b',
		secondaryBg: isDark ? '#252525' : '#f7fafc',
		secondaryText: isDark ? '#a0aec0' : '#718096',
		hoverBg: isDark ? '#2d3748' : '#edf2f7',
		iconColor: isDark ? '#cbd5e0' : '#4a5568',
		bgColor: isDark ? '#1a1a1a' : '#ffffff',
		textColor: isDark ? '#e0e0e0' : '#2b3a4a'
	};

	const audioUrl = verse.audio?.url ? `https://verses.quran.com/${verse.audio.url}` : null;

	// Widget and height
	const customWidthStyle = options.customWidth
		? `width: ${options.customWidth}; max-width: ${options.customWidth};`
		: 'max-width: 800px;';
	const customHeightStyle = options.customHeight
		? `max-height: ${options.customHeight}; overflow: auto;`
		: 'overflow: hidden;';

	// Container style
	const widgetStyle = `
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
		background-color: ${colors.bgColor};
		color: ${colors.textColor};
		border: 1px solid ${colors.borderColor};
		border-radius: 12px;
		margin: 0 auto;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		${customWidthStyle}
		${customHeightStyle}
	`;
</script>

<div>
	<!-- Inline font definition that will be injected with the widget -->
	<style>
		@font-face {
			font-family: 'UthmanicHafs';
			src: url('https://ayah-widget.vercel.app/fonts/UthmanicHafs1Ver18.woff2') format('woff2');
			font-weight: normal;
			font-style: normal;
			font-display: swap;
		}
	</style>

	<div class="quran-widget" style={widgetStyle}>
		<Header {verse} {options} {colors} />

		<!-- Content -->
		<div style="padding: 20px 24px 0px 24px;">
			<ArabicVerse {verse} {options} {colors} />

			<!-- Translations -->
			<Translations {verse} {options} {colors} />
		</div>

		<!-- Footer with Quran.com Link -->
		{#if options.showQuranLink}
			<QDCLink {verse} {options} {colors} />
		{/if}

		<!-- Hidden audio element -->
		{#if options.enableAudio && audioUrl}
			<audio data-audio-element src={audioUrl}></audio>
		{/if}
	</div>
</div>
