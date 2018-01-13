import { Session, Controller, Get } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { PurestService } from './purest.service';

@Controller('auth')
export class OAuthController {
	constructor(
		private jwtService: JwtService,
		private purestService: PurestService
	) { }

	@Get('github/callback')
	public async githubCallBack(@Session() session: any) {
		console.log(session.grant);
		const token = session.grant.response.access_token;
		const userInfo = await this.purestService.getGithubUser(token);
		return this.jwtService.sign(userInfo);
	}
}
