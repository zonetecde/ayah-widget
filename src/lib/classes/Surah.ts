export class Surah {
	id: number;
	name_simple: string;
	verses_count: number;

	constructor(data: any) {
		this.id = data.id;
		this.name_simple = data.name_simple;
		this.verses_count = data.verses_count;
	}
}
