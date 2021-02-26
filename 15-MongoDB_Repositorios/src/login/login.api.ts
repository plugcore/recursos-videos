import { IsString, Required } from '@plugcore/core';

export class LoginReqSchema {

	@IsString({ maxLength: 64 })
	user?: string;

	@IsString({ maxLength: 64 })
	password?: string;

}
export class LoginResSchema {

	@Required()
	@IsString({ maxLength: 4048 })
	token: string;

}