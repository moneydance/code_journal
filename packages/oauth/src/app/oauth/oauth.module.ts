import { Module } from '@nestjs/common';
import { OAuthController } from './oauth.controller';
import { JwtService } from './jwt.service';
import { PurestService } from './purest.service';

@Module({
	controllers: [
		OAuthController
	],
	components: [
		JwtService,
		PurestService
	]
})
export class OAuthModule {}
