<script lang="ts">
	import type { Verse, WidgetOptions } from '$lib/types/quran';

	interface Props {
		verse: Verse;
		options: WidgetOptions;
	}

	let { verse, options }: Props = $props();

	const isDark = options.theme === 'dark';
	const bgColor = isDark ? '#1a1a1a' : '#ffffff';
	const textColor = isDark ? '#e0e0e0' : '#2b3a4a';
	const borderColor = isDark ? '#2d3748' : '#e2e8f0';
	const linkColor = isDark ? '#60a5fa' : '#20a49b';
	const secondaryBg = isDark ? '#252525' : '#f7fafc';
	const secondaryText = isDark ? '#a0aec0' : '#718096';
	const hoverBg = isDark ? '#2d3748' : '#edf2f7';
	const iconColor = isDark ? '#cbd5e0' : '#4a5568';

	const audioUrl = verse.audio?.url ? `https://verses.quran.com/${verse.audio.url}` : null;

	let showMenu = $state(false);
	let audioPlaying = $state(false);
	let audioElement: HTMLAudioElement | null = null;

	function copyVerse() {
		const text = `${verse.text_uthmani}\n\n${verse.translations?.map((t) => t.text).join('\n\n') || ''}`;
		navigator.clipboard.writeText(text);
	}

	function toggleAudio() {
		if (audioElement) {
			if (audioPlaying) {
				audioElement.pause();
			} else {
				audioElement.play();
			}
			audioPlaying = !audioPlaying;
		}
	}
</script>

<div>
	<!-- Inline font definition that will be injected with the widget -->
	<style>
		@font-face {
			font-family: 'UthmanicHafs';
			src: url('/fonts/UthmanicHafs1Ver18.woff2') format('woff2');
			font-weight: normal;
			font-style: normal;
			font-display: swap;
		}
	</style>

	<div
		class="quran-widget"
		style="
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: {bgColor};
    color: {textColor};
    border: 1px solid {borderColor};
    border-radius: 12px;
    overflow: hidden;
    max-width: 800px;
    margin: 0 auto;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  "
	>
		<!-- Header with verse info and actions -->
		<div
			style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background-color: {secondaryBg};
      border-bottom: 1px solid {borderColor};
    "
		>
			<div style="display: flex; align-items: center; gap: 12px;">
				<!-- Bismillah icon -->
				<div
					style="
          width: 36px;
          height: 36px;
          background-color: {linkColor};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
        "
				>
					{verse.verse_number}
				</div>
				<div>
					<div style="font-weight: 600; font-size: 14px; color: {textColor};">
						Verse {options.ayah}
					</div>
					<div style="font-size: 12px; color: {secondaryText};">
						{verse.verse_key}
					</div>
				</div>
			</div>

			<!-- Action buttons -->
			<div style="display: flex; gap: 8px; position: relative;">
				{#if options.enableAudio && audioUrl}
					<!-- svelte-ignore a11y_mouse_events_have_key_events -->
					<button
						onclick={toggleAudio}
						style="
            width: 36px;
            height: 36px;
            border-radius: 6px;
            border: none;
            background-color: {hoverBg};
            color: {iconColor};
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
          "
						onmouseover={(e) => (e.currentTarget.style.backgroundColor = borderColor)}
						onmouseout={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
					>
						{#if audioPlaying}
							<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
								<rect x="4" y="3" width="3" height="10" />
								<rect x="9" y="3" width="3" height="10" />
							</svg>
						{:else}
							<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
								<path d="M5 3v10l8-5z" />
							</svg>
						{/if}
					</button>
				{/if}

				<!-- svelte-ignore a11y_mouse_events_have_key_events -->
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button
					onclick={() => (showMenu = !showMenu)}
					style="
          width: 36px;
          height: 36px;
          border-radius: 6px;
          border: none;
          background-color: {hoverBg};
          color: {iconColor};
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        "
					onmouseover={(e) => (e.currentTarget.style.backgroundColor = borderColor)}
					onmouseout={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
				>
					<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
						<circle cx="8" cy="3" r="1.5" />
						<circle cx="8" cy="8" r="1.5" />
						<circle cx="8" cy="13" r="1.5" />
					</svg>
				</button>

				<!-- Dropdown menu -->
				{#if showMenu}
					<div
						style="
            position: absolute;
            top: 42px;
            right: 0;
            background-color: {bgColor};
            border: 1px solid {borderColor};
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            min-width: 180px;
            z-index: 10;
          "
					>
						<!-- svelte-ignore a11y_mouse_events_have_key_events -->
						<button
							onclick={() => {
								copyVerse();
								showMenu = false;
							}}
							style="
              width: 100%;
              padding: 10px 16px;
              border: none;
              background: none;
              text-align: left;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 10px;
              color: {textColor};
              font-size: 14px;
              transition: background-color 0.2s;
            "
							onmouseover={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
							onmouseout={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
						>
							<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
								<path
									d="M4 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z"
								/>
								<path
									d="M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"
								/>
							</svg>
							Copy Verse
						</button>
					</div>
				{/if}
			</div>
		</div>

		<!-- Content -->
		<div style="padding: 24px;">
			<!-- Arabic Text with optional Word by Word Translation -->
			{#if options.enableWbw && verse.words}
				<div
					style="
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
          direction: rtl;
          text-align: right;
          font-size: 32px;
          line-height: 2;
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
                gap: 4px;
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
								{#if word.translation?.text}
									<div
										style="
                    font-size: 11px;
                    color: {secondaryText};
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
			{:else}
				<!-- Display simple Arabic text without word by word -->
				<div
					style="
          font-size: 32px;
          line-height: 2;
          text-align: right;
          direction: rtl;
          margin-bottom: 24px;
          font-family: 'UthmanicHafs', 'Traditional Arabic', 'Arabic Typesetting', 'Scheherazade', serif;
        "
				>
					{verse.text_uthmani}
				</div>
			{/if}

			<!-- Translations -->
			{#if verse.translations && verse.translations.length > 0 && options.hasAnyTranslations}
				<div style="margin-top: 24px;">
					{#each verse.translations as translation}
						<div
							style="
              padding: 16px 0;
              border-top: 1px solid {borderColor};
            "
						>
							<div
								style="
                font-size: 16px;
                line-height: 1.75;
                color: {textColor};
                margin-bottom: {options.showTranslatorNames ? '8px' : '0'};
              "
							>
								{@html translation.text}
							</div>
							{#if options.showTranslatorNames}
								<div
									style="
                  font-size: 13px;
                  color: {secondaryText};
                  margin-top: 8px;
                "
								>
									Translation ID: {translation.resource_id}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Footer with Quran.com Link -->
		{#if options.showQuranLink}
			<div
				style="
        padding: 12px 16px;
        background-color: {secondaryBg};
        border-top: 1px solid {borderColor};
        text-align: center;
      "
			>
				<a
					href="https://quran.com/{options.ayah}"
					target="_blank"
					rel="noopener noreferrer"
					style="
          color: {linkColor};
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
		{/if}

		<!-- Hidden audio element -->
		{#if options.enableAudio && audioUrl}
			<audio bind:this={audioElement} src={audioUrl} onended={() => (audioPlaying = false)}></audio>
		{/if}
	</div>
</div>
