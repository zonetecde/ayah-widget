export class Reciter {
	id: number;
	name: string;

	constructor(data: any) {
		this.id = data.id;
		this.name = data.reciterName + (data.style ? ' ' + data.style : '');
	}
}
