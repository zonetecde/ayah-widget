import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { QuranApiClient, QuranApiError } from '$lib/server/quranApiClient';

export const GET: RequestHandler = async () => {
	try {
		const { data } = await QuranApiClient.fetchJson<{ reciters: unknown[] }>(
			'/resources/chapter_reciters'
		);

		return json(data);
	} catch (error) {
		if (error instanceof QuranApiError) {
			return json(
				{ error: error.message, details: error.details },
				{ status: error.status }
			);
		}

		return json({ error: 'Unknown error' }, { status: 500 });
	}
};
