import { Surah } from '$lib/classes/Surah';
import { Translation } from '$lib/classes/Translation';

class GlobalState {
	static readonly API_BASE = 'https://api.quran.com/api/v4';

	surahs: Surah[] = $state([]);
	availableTranslations: Translation[] = $state([]);

	async loadSurahs() {
		const res = await fetch(`${GlobalState.API_BASE}/chapters`);
		const data = await res.json();
		this.surahs = data.chapters.map((item: any) => new Surah(item));
	}

	async loadTranslations() {
		const res = await fetch(`${GlobalState.API_BASE}/resources/translations`);
		const data = await res.json();
		this.availableTranslations = data.translations.map((item: any) => new Translation(item));
	}
}

export const globalState = new GlobalState();
