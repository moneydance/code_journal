import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from 'src/app/app.module';
import { GRANT_CONFIG } from 'src/config/grant.config';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as Grant from 'grant-express';
import * as session from 'express-session';
import * as cors from 'cors';

async function bootstrap() {
	const app: INestApplication = await NestFactory.create(ApplicationModule);
	app.use(bodyParser.json());
	app.use(session({ secret: 'shhhhh its a secret' }));
	app.use(cors());
	app.use(new Grant(GRANT_CONFIG));
	await app.listen(3000);
	console.log('Application is listening on port 3000');
}
bootstrap();
