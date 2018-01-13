import * as jws from 'jws';
import { PUBLIC_KEY, PRIVATE_KEY } from 'src/config/jwt.config';
import { Component } from '@nestjs/common';
import * as request from 'request-promise-native';
import * as Purest from 'purest';
import * as config from '@purest/providers';

const purest = Purest({ request });

@Component()
export class PurestService {
	private githubDefaults = { headers: { 'user-agent': 'Node Server' } };
	private github = purest({ config, provider: 'github', defaults: this.githubDefaults });

	public async getGithubUser(token: string) {
		console.log(token);
		const userInfo = await this.github
			.get('user')
			.auth(token)
			.request();
		console.log(userInfo);
		return userInfo;
	}
}
