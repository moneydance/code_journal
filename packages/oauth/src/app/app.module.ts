import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OAuthModule } from './oauth/oauth.module';

@Module({
	modules: [
		UserModule,
		OAuthModule,
	]
})
export class ApplicationModule {}
