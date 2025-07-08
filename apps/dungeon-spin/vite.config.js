// @ts-ignore
import config from 'config-vite';
import { defineConfig } from 'vite';

export default defineConfig({
	...config(),
	server: {
		fs: {
			allow: ['..', '../..'],
		},
	},
});
