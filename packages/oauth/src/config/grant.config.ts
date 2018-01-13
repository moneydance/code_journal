import * as process from 'process';

export const GRANT_CONFIG: any = {
	server: {
		protocol: 'http',
		host: 'localhost',
		path: '/api',
		transport: 'session',
    	state: true,
	},
	github: {
		key: process.env.GITHUB_CLIENT_ID,
		secret: process.env.GITHUB_SECRET,
    	scope: ['user'],
		callback: '/api/auth/github/callback'
	}
};
