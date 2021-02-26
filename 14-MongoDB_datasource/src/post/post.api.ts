import { ExtendsSchema, IsBoolean, IsString } from '@plugcore/core';
import { PostModel } from './post.model';

// Aquí por ejemplo extendemos un modelo creado previamente
// y tomamos todas su propiedades menos el id
@ExtendsSchema(PostModel, { ignoreProperties: ['id'] })
export class CreatePostReqSchema { }
// Ejemplo típico de model
export class CreatePostResSchema {
	@IsBoolean()
	success: boolean;
	@IsString({ maxLength: 128 })
	newId: string;
}
// Usamos los tipos en vez de las clases para tener más flexibilidad
// dado que podemos extender modelos usando las clases
export type CreatePostReq = Omit<PostModel, 'id'>;
export type CreatePostRes = CreatePostResSchema;
