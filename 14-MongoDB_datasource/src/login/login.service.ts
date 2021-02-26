import { InjectLogger, Logger, Service } from '@plugcore/core';
import { JwtLogin, Request } from '@plugcore/web';
import { LoginReqSchema, LoginResSchema } from './login.api';

@Service()
export class LoginService {

	constructor(
		@InjectLogger('auth') private log: Logger
	) { }

	
	@JwtLogin({
		routeSchemas: {
			tags: ['auth'],
			request: LoginReqSchema,
			response: LoginResSchema
		}
	})
	public async jwtLogin(request: Request) {
		this.log.info('jwtLogin');
		if (request.body && request.body.user === 'testUser' && request.body.password === 'test') {
			return {
				userId: 'myuser',
				prop1: 'string1',
				prop2: 2
			};
		}
	}
}
