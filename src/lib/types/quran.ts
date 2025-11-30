export interface Word {
	id: number;
	position: number;
	audioUrl: string | null;
	charTypeName: string;
	codeV1: string;
	pageNumber: number;
	lineNumber: number;
	text: string;
	translation?: {
		text: string;
		languageName: string;
	};
	transliteration?: {
		text: string;
		languageName: string;
	};
}

export interface Translation {
	id: number;
	resourceId: number;
	text: string;
	resource_name?: string;
	name?: string;
	translator_name?: string;
	author_name?: string;
}

export interface Audio {
	url: string;
	segments: number[][];
}

export interface Verse {
	id: number;
	verseNumber: number;
	verseKey: string;
	hizbNumber?: number;
	rubElHizbNumber?: number;
	rukuNumber?: number;
	manzilNumber?: number;
	sajdahNumber?: number | null;
	textUthmani?: string;
	pageNumber?: number;
	juzNumber?: number;
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
	customWidth?: string;
	customHeight?: string;
}
