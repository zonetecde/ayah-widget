# Quran Widget Usage (Quick Guide)

## What this widget is

A drop-in Quran verse widget you can embed on any web page. It renders the Arabic text, optional translations, and an audio play/pause control.

## Development Setup

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
END_POINT=https://oauth2.quran.foundation
API_BASE_URL=https://apis.quran.foundation/content/api/v4
```

## Quick embed

1. Add a container where the widget will render:

```html
<div id="quran-embed-remote"></div>
```

2. Include the script from your deployed domain and point it to the container with data attributes:

```html
<script
	src="https://ayah-widget.vercel.app/quran-embed.js"
	data-quran-origin="https://ayah-widget.vercel.app"
	data-quran-target="quran-embed-remote"
	data-quran-ayah="33:56"
	data-quran-translation-ids="20"
	data-quran-reciter-id="7"
	data-quran-audio="true"
	data-quran-word-by-word="false"
	data-quran-theme="light"
	data-quran-show-translator-names="false"
	data-quran-show-quran-link="true"
	async
></script>
```

## Required attributes

- `data-quran-target`: the id of your container div.
- `data-quran-ayah`: verse key in `SURAH:AYAH` format, e.g. `33:56`.

## Optional attributes

- `data-quran-translation-ids`: comma-separated translation ids from api.quran.com (e.g. `20`).
- `data-quran-reciter-id`: reciter id for audio (default `7`).
- `data-quran-audio`: `true` to show play/pause.
- `data-quran-word-by-word`: `true` to show word-by-word translations.
- `data-quran-theme`: `light` or `dark`.
- `data-quran-show-translator-names`: `true` to show translator names.
- `data-quran-show-quran-link`: `true` to show a Quran.com link.
- `data-quran-origin`: API host for widget HTML (use your deployed origin).
