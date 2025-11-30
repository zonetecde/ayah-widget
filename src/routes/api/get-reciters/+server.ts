import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { QuranApiClient } from '$lib/server/quranApiClient';

export const GET: RequestHandler = async () => {
	try {
		const data = await QuranApiClient.getInstance().resources.findAllRecitations();

		return json(data);
	} catch (error) {
		console.error(error!);
		return json({ error: 'Failed to fetch reciters' }, { status: 500 });
	}
};
