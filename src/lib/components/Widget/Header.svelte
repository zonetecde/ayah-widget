<script lang="ts">
	import type { Verse, WidgetOptions } from '$lib/types/quran';
	import type WidgetProps from './WidgetProps';

	let { verse, options, colors }: WidgetProps = $props();

	const audioUrl = verse.audio?.url ? `https://verses.quran.com/${verse.audio.url}` : null;
</script>

<!-- Header with verse info and actions -->
<div
	style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background-color: {colors!.secondaryBg};
      border-bottom: 1px solid {colors!.borderColor};
    "
>
	<div style="display: flex; align-items: center; gap: 12px;">
		<!-- Quran.com icon -->
		<img
			src="https://quran.com/images/logo/Logo@192x192.png"
			alt="Quran.com logo"
			style="
		  width: 36px;
		  height: 36px;
		  border-radius: 50%;
		"
		/>
		<div>
			<div style="font-weight: 600; font-size: 14px; color: {colors!.textColor};">
				{#if options.surahName}
					Surah {options.surahName}, Verse {verse.verse_number}
				{:else}
					Verse {options.ayah}
				{/if}
			</div>
			<div style="font-size: 12px; color: {colors!.secondaryText};">
				{verse.verse_key}
			</div>
		</div>
	</div>

	<!-- Action buttons -->
	<div style="display: flex; gap: 8px; position: relative;">
		{#if options.enableAudio && audioUrl}
			<!-- svelte-ignore a11y_mouse_events_have_key_events -->
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button
				data-audio-button
				type="button"
				style="
            width: 36px;
            height: 36px;
            border-radius: 6px;
            border: none;
            background-color: {colors!.hoverBg};
            color: {colors!.iconColor};
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
          "
			>
				<span data-play-icon>
					<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
						<path d="M5 3v10l8-5z" />
					</svg>
				</span>
				<span data-pause-icon style="display: none;">
					<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
						<rect x="4" y="3" width="3" height="10" />
						<rect x="9" y="3" width="3" height="10" />
					</svg>
				</span>
			</button>
		{/if}

		<!-- svelte-ignore a11y_mouse_events_have_key_events -->
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button
			data-menu-toggle
			style="
          width: 36px;
          height: 36px;
          border-radius: 6px;
          border: none;
          background-color: {colors!.hoverBg};
          color: {colors!.iconColor};
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        "
			onmouseover={(e) => (e.currentTarget.style.backgroundColor = colors!.borderColor)}
			onmouseout={(e) => (e.currentTarget.style.backgroundColor = colors!.hoverBg)}
		>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
				<circle cx="8" cy="3" r="1.5" />
				<circle cx="8" cy="8" r="1.5" />
				<circle cx="8" cy="13" r="1.5" />
			</svg>
		</button>

		<!-- Dropdown menu (handled by embed script for static HTML) -->
		<div
			data-menu
			style="
            display: none;
            position: absolute;
            top: 42px;
            right: 0;
            background-color: {colors!.bgColor};
            border: 1px solid {colors!.borderColor};
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            min-width: 180px;
            z-index: 10;
          "
		>
			<!-- svelte-ignore a11y_mouse_events_have_key_events -->
			<button
				data-copy-verse
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
              color: {colors!.textColor};
              font-size: 14px;
              transition: background-color 0.2s;
            "
				onmouseover={(e) => (e.currentTarget.style.backgroundColor = colors!.hoverBg)}
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
	</div>
</div>
