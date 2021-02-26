import { OnInit, Service } from '@plugcore/core';
import { MongoDbDatasource } from '@plugcore/ds-mongodb';
import { Collection } from 'mongodb';
import { PostModel } from './post.model';

// Nombre de la conexión que vamos a usar para este servicio
@Service({ connection: 'mymongodb' })
// Como vamos a necesitar ejecutar algunas operaciones async antes de que este 
// servicio esté listo vamos a implementar OnInit
export class PostService implements OnInit {

	// Aquí es donde vamos a guardar la referencia a nuestra collection
	private collection: Collection<PostModel>;

	constructor(
		// Conexión a la mongo definida en "mymongo"
		private mongoDbConnection: MongoDbDatasource
	) { }

	// Aquí ya podemos acceder a las collections que necesitemos
	public async onInit() {
		// Al método de "getCollection" podemos pasarle un string con el nombre de la colección
		// o directamente una clase si queremos que nos sirva tanto para el nombre de la colección
		// como de estructura de los objetos que estarán dentro de ella
		this.collection = await this.mongoDbConnection.getCollection<PostModel>('Post');

	}

	// Ejemplo de operaciones CRUD básicas

	public async create(Post: PostModel) {
		return this.collection.insertOne(Post);
	}

	public async findById(id: string): Promise<PostModel | null> {
		return this.collection.findOne({ id });
	}

	public async update(Post: PostModel) {
		return this.collection.updateOne({ id: Post.id }, Post);
	}

	public async remove(id: PostModel['id']) {
		return this.collection.deleteOne({ id });
	}

}