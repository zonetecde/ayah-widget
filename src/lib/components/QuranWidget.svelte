<script lang="ts">
	import type { Verse, WidgetOptions } from '$lib/types/quran';

	interface Props {
		verse: Verse;
		options: WidgetOptions;
	}

	let { verse, options }: Props = $props();

	const isDark = options.theme === 'dark';
	const bgColor = isDark ? '#1a1a1a' : '#ffffff';
	const textColor = isDark ? '#e0e0e0' : '#333333';
	const borderColor = isDark ? '#333333' : '#e0e0e0';
	const linkColor = isDark ? '#60a5fa' : '#2563eb';
	const secondaryBg = isDark ? '#252525' : '#f9fafb';
	const secondaryText = isDark ? '#9ca3af' : '#6b7280';

	const audioUrl = verse.audio?.url ? `https://verses.quran.com/${verse.audio.url}` : null;
</script>

<div
	class="quran-widget"
	style="
    font-family: 'Arial', sans-serif;
    background-color: {bgColor};
    color: {textColor};
    border: 1px solid {borderColor};
    border-radius: 8px;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  "
>
	<!-- Arabic Text with optional Word by Word Translation -->
	{#if options.enableWbw && verse.words}
		<div
			style="
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 20px;
        direction: rtl;
        text-align: right;
        font-size: 28px;
        line-height: 1.8;
        font-family: 'Traditional Arabic', 'Arabic Typesetting', 'Scheherazade', serif;
      "
		>
			{#each verse.words as word}
				{#if word.char_type_name === 'word'}
					<div
						style="
              display: inline-flex;
              flex-direction: column;
              align-items: center;
              gap: 2px;
            "
					>
						<div
							style="
                font-size: 28px;
                font-family: 'Traditional Arabic', 'Arabic Typesetting', 'Scheherazade', serif;
              "
						>
							{word.text_uthmani}
						</div>
						{#if word.translation?.text}
							<div
								style="
                  font-size: 10px;
                  color: {secondaryText};
                  text-align: center;
                  white-space: nowrap;
                "
							>
								{word.translation.text}
							</div>
						{/if}
					</div>
				{/if}
			{/each}
		</div>
	{:else}
		<!-- Display simple Arabic text without word by word -->
		<div
			style="
        font-size: 28px;
        line-height: 1.8;
        text-align: right;
        direction: rtl;
        margin-bottom: 20px;
        font-family: 'Traditional Arabic', 'Arabic Typesetting', 'Scheherazade', serif;
      "
		>
			{verse.text_uthmani}
		</div>
	{/if}

	<!-- Translations -->
	{#if verse.translations && verse.translations.length > 0}
		<div style="margin-bottom: 20px;">
			{#each verse.translations as translation}
				<div
					style="
            margin-bottom: 15px;
            padding: 15px;
            background-color: {secondaryBg};
            border-left: 3px solid {linkColor};
            border-radius: 4px;
          "
				>
					<div
						style="
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: {options.showTranslatorNames ? '8px' : '0'};
            "
					>
						{@html translation.text}
					</div>
					{#if options.showTranslatorNames}
						<div
							style="
                font-size: 12px;
                color: {secondaryText};
                font-style: italic;
              "
						>
							— Translation ID: {translation.resource_id}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}

	<!-- Audio Player -->
	{#if options.enableAudio && audioUrl}
		<div style="margin-bottom: 15px;">
			<audio controls style="width: 100%; border-radius: 4px;">
				<source src={audioUrl} type="audio/mpeg" />
				Your browser does not support the audio element.
			</audio>
		</div>
	{/if}

	<!-- Quran.com Link -->
	{#if options.showQuranLink}
		<div
			style="
        text-align: center;
        padding-top: 15px;
        border-top: 1px solid {borderColor};
      "
		>
			<a
				href="https://quran.com/{options.ayah}"
				target="_blank"
				rel="noopener noreferrer"
				style="
          color: {linkColor};
          text-decoration: none;
          font-size: 14px;
        "
			>
				View on Quran.com →
			</a>
		</div>
	{/if}
</div>
