import { API_BASE_URL, CLIENT_ID, CLIENT_SECRET, END_POINT } from '$env/static/private';

type TokenCache = { token: string; expiry: number };

export class QuranApiError extends Error {
	status: number;
	details?: unknown;

	constructor(status: number, message: string, details?: unknown) {
		super(message);
		this.status = status;
		this.details = details;
	}
}

export class QuranApiClient {
	private static tokenCache: TokenCache | null = null;

	private static buildUrl(
		path: string,
		query?: Record<string, string | number | undefined>
	): URL {
		const normalizedBase = API_BASE_URL.replace(/\/+$/, '');
		const normalizedPath = path.startsWith('http')
			? path
			: `${normalizedBase}/${path.replace(/^\/+/, '')}`;

		const url = new URL(normalizedPath);

		if (query) {
			for (const [key, value] of Object.entries(query)) {
				if (value !== undefined) {
					url.searchParams.set(key, String(value));
				}
			}
		}

		return url;
	}

	private static async getAccessToken(): Promise<string> {
		if (this.tokenCache && this.tokenCache.expiry > Date.now()) {
			return this.tokenCache.token;
		}

		const tokenUrl = `${END_POINT.replace(/\/+$/, '')}/oauth2/token`;
		const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

		const tokenRes = await fetch(tokenUrl, {
			method: 'POST',
			headers: {
				Authorization: `Basic ${auth}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: 'grant_type=client_credentials&scope=content'
		});

		if (!tokenRes.ok) {
			const errorText = await tokenRes.text();
			throw new QuranApiError(
				tokenRes.status,
				`Failed to get access token: ${tokenRes.status}`,
				errorText
			);
		}

		const tokenData = await tokenRes.json();

		this.tokenCache = {
			token: tokenData.access_token,
			expiry: Date.now() + (tokenData.expires_in - 60) * 1000
		};

		return tokenData.access_token;
	}

	static async fetchJson<T>(
		path: string,
		options: {
			query?: Record<string, string | number | undefined>;
			init?: RequestInit;
		} = {}
	): Promise<{ data: T; status: number; url: string }> {
		const accessToken = await this.getAccessToken();
		const url = this.buildUrl(path, options.query);

		const headers: HeadersInit = {
			Accept: 'application/json',
			'x-auth-token': accessToken,
			'x-client-id': CLIENT_ID,
			...(options.init?.headers ?? {})
		};

		const res = await fetch(url, {
			...options.init,
			headers
		});

		let data: T;

		try {
			data = (await res.json()) as T;
		} catch (err) {
			throw new QuranApiError(res.status, 'Invalid JSON response from Quran API', err);
		}

		if (!res.ok) {
			throw new QuranApiError(
				res.status,
				(data as any)?.message || `API error: ${res.status}`,
				data
			);
		}

		return { data, status: res.status, url: url.toString() };
	}
}
