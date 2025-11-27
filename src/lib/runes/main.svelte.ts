import { Reciter } from '$lib/classes/Reciter';
import { Surah } from '$lib/classes/Surah';
import { Translation } from '$lib/classes/Translation';

export type WidgetTheme = 'light' | 'dark';

class GlobalState {
	static readonly API_BASE = 'https://api.quran.com/api/v4';

	surahs: Surah[] = $state([]);
	availableTranslations: Translation[] = $state([]);
	availableReciters: Reciter[] = $state([]);

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

	async loadReciters() {
		const res = await fetch(`${GlobalState.API_BASE}/resources/reciters`);
		const data = await res.json();
		this.availableReciters = data.reciters.map((item: any) => new Reciter(item));
	}
}

export const preferences = new (class PreferencesState {
	containerId = $state('quran-embed-1');
	surah = $state(2);
	ayah = $state(255);
	translations = $state<Translation[]>([]);
	theme = $state<WidgetTheme>('light');
	enableAudio = $state(true);
	enableWbwTranslation = $state(false);
	showTranslatorName = $state(false);
	showQuranLink = $state(true);
	reciter = $state<number | null>(7);
})();

export const globalState = new GlobalState();
