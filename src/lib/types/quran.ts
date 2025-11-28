export interface Word {
	id: number;
	position: number;
	audio_url: string | null;
	char_type_name: string;
	verse_key: string;
	location: string;
	text_uthmani: string;
	text_indopak: string;
	line_number: number;
	page_number: number;
	text: string;
	translation?: {
		text: string;
		language_name: string;
	};
	transliteration?: {
		text: string;
		language_name: string;
	};
}

export interface Translation {
	id: number;
	resource_id: number;
	text: string;
}

export interface Audio {
	url: string;
	segments: number[][];
}

export interface Verse {
	id: number;
	verse_number: number;
	verse_key: string;
	chapter_id: number;
	text_uthmani: string;
	words?: Word[];
	translations?: Translation[];
	audio?: Audio;
}

export interface WidgetOptions {
	enableAudio: boolean;
	enableWbw: boolean;
	theme: 'light' | 'dark';
	showTranslatorNames: boolean;
	showQuranLink: boolean;
	ayah: string;
	hasAnyTranslations: boolean;
	surahName?: string;
}
