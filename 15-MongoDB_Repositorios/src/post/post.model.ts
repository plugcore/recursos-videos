import { IsNumber, IsString } from '@plugcore/core';

export class PostModel {

	@IsString({ maxLength: 128 })
	id: string;

	@IsNumber()
	views: number;

	@IsString({ maxLength: 256 })
	name: string;

}
