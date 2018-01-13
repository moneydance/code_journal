import * as jws from 'jws';
import { PUBLIC_KEY, PRIVATE_KEY } from 'src/config/jwt.config';
import { Component } from '@nestjs/common';

@Component()
export class JwtService {
	private static readonly EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7;
	private static readonly ALG = 'RS256';

	public sign(payload) {
		return jws.sign(this.generateToken(payload));
	}

	public verify(signature) {
		return jws.verify(signature, JwtService.ALG, PUBLIC_KEY);
	}

	private get epoch(): number {
		return new Date().getTime();
	}

	private generateToken(payload) {
		return {
			header: {
				alg: JwtService.ALG
			},
			payload: {
				expiration: this.epoch + JwtService.EXPIRATION_TIME,
				initialization: this.epoch,
				...payload
			},
			secret: PRIVATE_KEY
		};
	}
}
