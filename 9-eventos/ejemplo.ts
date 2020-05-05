import { Container, EventDispatcher, Service, OnEvent, PublicEvents, Logger } from "@plugcore/core";

//
// Función básica
//

(async () => {

	// 1: Necesitamos el event dispatcher, que es el encargado de controlar
	// la ejecución de todos los eventos.
	const eventDispatcher = await Container.get(EventDispatcher);
	// 2: Función que se va a ejecutar cuando pase un determinado evento
	const listenerFunc = (name: string) => { console.log(`Nuevo usuario creado: ${name}`) };
	// 3: Registramos la función para que se ejecute en el evento
	eventDispatcher.on(
		// Nombre del evento
		'newUser',
		// Función que se va a ejecutar
		listenerFunc
	);
	// 4: lanzamos el evento
	eventDispatcher.emit('newUser', 'Jack');

})().then().catch(console.error)

//
// Importancia de los contextos
//

class ListenerClass {
	constructor(private appName: string) {}
	public listenerFunc(name: string) {
		console.log(`Nuevo usuario creado: ${name} en la app ${this.appName}`);
	}
}
(async () => {

	// 1: Necesitamos el event dispatcher como antes
	const eventDispatcher = await Container.get(EventDispatcher);
	// 1: Creamos una instancia de nuestra clase
	const listener = new ListenerClass('Test');
	// 3: Registramos la función para que se ejecute en el evento
	eventDispatcher.on(
		// Nombre del evento
		'newUser',
		// Función que se va a ejecutar
		listener.listenerFunc,
		// Contexto, que será el objeto que hemos creado
		listener
	);
	// 4: lanzamos el evento
	eventDispatcher.emit('newUser', 'Jack');

})().then().catch(console.error)

//
// Usando servicios
//
@Service()
export class ListenerService {
	constructor(private log: Logger) {}
	@OnEvent('newUser') // Aquí ya registramos esta función para el evento
	public listenerFunc(name: string) {
		this.log.info(`Nuevo usuario creado: ${name}`);
	}
}

(async () => {

// 1: Necesitamos el event dispatcher como antes
const eventDispatcher = await Container.get(EventDispatcher);
// 2: Vamos a aprovecharnos de un evento que lanza plugcore
// que nos indica que todos los servicios están listos
// para que así podamos lanzar el evento
eventDispatcher.on(PublicEvents.allServicesLoaded, () => {
	// 4: lanzamos el evento
	eventDispatcher.emit('newUser', 'Jack');
});

})().then().catch(console.error)

