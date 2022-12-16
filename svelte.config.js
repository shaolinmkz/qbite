import preprocess from 'svelte-preprocess';
// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter()
	}
};

if (process.env.NODE_ENV === 'test') {
	config.kit.vite = {
		test: {
			environment: 'jsdom',
			globals: true,
			setupFiles: './setupTests.ts'
		}
	};
}

export default config;
