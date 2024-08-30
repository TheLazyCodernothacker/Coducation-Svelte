import { SvelteKitAuth } from '@auth/sveltekit';
import { AUTH_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import GitHub from '@auth/core/providers/github';

const baseUrl = import.meta.env.BASE_URL;

const auth = SvelteKitAuth({
	providers: [
		GitHub({
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET
		})
	],
	pages: {
		signIn: `${baseUrl}/auth/signin`,
		signOut: `${baseUrl}/auth/signout`,
		error: `${baseUrl}/auth/error`,
		verifyRequest: `${baseUrl}/auth/verify-request`,
		newUser: `${baseUrl}/auth/new-user`
	},
	session: {
		maxAge: 60 * 60 * 24 * 365,
		strategy: 'jwt'
	},

	secret: AUTH_SECRET
});

export const handle = auth.handle;
