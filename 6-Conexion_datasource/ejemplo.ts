import { Service, Logger, HttpDatasource, Container, Inject } from "@plugcore/core";

interface Todo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

/* @Service({ connection: 'jsonplaceholder' })
export class JsonPlaceholderService {

	constructor(
		// El log, dado que está siendo inyectado en un servicio con "connection", agregará este nombre
		// al json de log, para que después podamos podamos filtrar todos los logs de esta conexión
		private log: Logger,
		// El servicio de "HttpDatasource" detecta también la propiedad "connection" y buscará
		// en la configuración del proyecto los datos de conexión
		private httpDs: HttpDatasource
	) { }

	public async getTodo(id: number): Promise<Todo> {
		this.log.info('Searching for todo: ' + id);
		return this.httpDs.get<Todo>(`/todos/${id}`);
	}

} */

@Service()
export class JsonPlaceholderService {

	constructor(
		private log: Logger,
		@Inject({ variation: { [Container.connection]: 'jsonplaceholder' } })
		private httpDs: HttpDatasource
	) { }

	public async getTodo(id: number): Promise<Todo> {
		this.log.info('Searching for todo: ' + id);
		return this.httpDs.get<Todo>(`/todos/${id}`);
	}

}


(async () => {

	const jsonPlaceholderService = await Container.get(JsonPlaceholderService);
	const result = await jsonPlaceholderService.getTodo(1);
	console.log('JSONPLACEHOLDER Tod result:', { result });

})().then().catch(console.error)
