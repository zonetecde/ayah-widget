export class Translation {
	id: number;
	author_name: string;
	name: string;
	language_name: string;

	constructor(data: any) {
		this.id = data.id;
		this.language_name = data.language_name;
		this.author_name = data.author_name;
		this.name = data.name;
	}
}
