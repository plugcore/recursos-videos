import { InjectLogger, Logger } from '@plugcore/core';
import { Controller, Get, Post, Request, Response } from '@plugcore/web';
import { ObjectId } from 'mongodb';
import { CreatePostReq, CreatePostReqSchema, CreatePostRes, CreatePostResSchema } from './post.api';
import { PostRepository } from './post.repository';

@Controller({ urlBase: '/posts' })
export class PostsController {

    constructor(
        @InjectLogger('posts') private log: Logger,
        private postRepository: PostRepository
    ) { }

    @Get({
        security: 'jwt',
        routeSchemas: {
            tags: ['posts']
        }
    })
    public async getAllPosts(request: Request<CreatePostReq>, response: Response) {
        this.log.info(request.jwtPayload);
        return [1, 2];
    }

    @Post({
        security: 'jwt',
        routeSchemas: {
            tags: ['posts'],
            request: CreatePostReqSchema,
            response: CreatePostResSchema
        }
    })
    public async createPost(request: Request<CreatePostReq>, response: Response) {
        const newId = (new ObjectId()).toHexString();
        await this.postRepository.deleteOne('6037b193e787da3034b9420c')
        return <CreatePostRes>{
            success: true,
            newId: newId
        };
    }

}
