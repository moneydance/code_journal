import { Controller, Get, Query } from '@nestjs/common';
import { Request, Response } from 'express';
@Controller('users')
export class UserController {
	@Get()
	public test(@Query() butts) {
		console.log(butts);
		return { test: 'this is a test' };
	}
}
