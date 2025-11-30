import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { Language, QuranClient } from '@quranjs/api';

export class QuranApiClient {
	private static instance: QuranClient;

	static getInstance(): QuranClient {
		if (!this.instance) {
			this.instance = new QuranClient({
				clientId: CLIENT_ID!,
				clientSecret: CLIENT_SECRET!,
				authBaseUrl: 'https://oauth2.quran.foundation',
				contentBaseUrl: 'https://apis.quran.foundation',
				defaults: {
					language: Language.ENGLISH
				}
			});
		}
		return this.instance;
	}
}
