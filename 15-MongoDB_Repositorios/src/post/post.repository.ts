import { OnInit, Service } from '@plugcore/core';
import { MongoDbDatasource, MongoDbRepository } from '@plugcore/ds-mongodb';
import { PostModel } from './post.model';

// Ejemplo de servicio que usa MongoDbRepository
@Service({ connection: 'mymongodb' })
export class PostRepository implements OnInit {
 
    // Aquí definimos nuestro MongoDbRepository que guardará documentos de tipo "PostModel" y usará el atributo "id" como identificador.
    private repository: MongoDbRepository<PostModel, 'id'>;
 
    constructor(
        private mongoDbDatasource: MongoDbDatasource
    ) {}
 
    public async onInit() {
 
        this.repository = new MongoDbRepository<PostModel, 'id'>({
			dataSource: this.mongoDbDatasource,
            collectionName: 'Post', // Nombre de la colección en MongoDB
            idAttribute: 'id', // Tag id
            auditEditedEntries: true, // Añade los campos de creación y actualización a los documentos editados
            auditDeletedEntries: true, // Todos los documentos que se eliminen se guardarán en una colección a parte
        });

		await  this.repository.onInit(); // Tenemos que ejecutar el init para que se conecte a la collection de MongoDb
 
    }

	// Ejemplo de operaciones CRUD básicas

	public async create(post: PostModel) {
		return this.repository.insertOne(post, 'un user id');
	}

	public async findById(id: string): Promise<PostModel | null> {
		return this.repository.findById(id);
	}

	public async update(post: PostModel) {
		return this.repository.updateOne({ id: post.id }, post);
	}

	public async deleteOne(id: PostModel['id']) {
		return this.repository.deleteOne({ id });
	}
 
}