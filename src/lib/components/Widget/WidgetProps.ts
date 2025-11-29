import type { Verse, WidgetOptions } from '$lib/types/quran';

export default interface WidgetProps {
	verse: Verse;
	options: WidgetOptions;
	colors?: {
		borderColor: string;
		linkColor: string;
		secondaryBg: string;
		secondaryText: string;
		hoverBg: string;
		iconColor: string;
		bgColor: string;
		textColor: string;
	};
}
