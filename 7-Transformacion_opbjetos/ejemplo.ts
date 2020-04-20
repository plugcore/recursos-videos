import { Container, ObjectMapper, ObjectMapping, Service } from "@plugcore/core";

//
// Ejemplo básico
//

(async () => {

	const sourceObject = {
		sourceString: 'value1',
		sourceNumber: 2,
		sourceObject: {
				otherString: 'value3'
		}
	};

	// El Object mapper es un servicio que nos podemos importar
	const objectMapper = await Container.get(ObjectMapper);

	// Las claves del objeto de configuración son las mismas
	// que las del objeto de entrada (source) y los valores
	// serán las claves del objeto de salida (target)
	const mapping = {
		sourceString: 'myProps.stringProp1',
		sourceNumber: 'myProps.numProp',
		['sourceObject.otherString']: 'myProps.stringProp2'
	};
	const targetObject = objectMapper.map(mapping, sourceObject);
	console.log(JSON.stringify(targetObject, undefined, '\t'));



})().then().catch(console.error)

//
// Ejemplo avanzado
//

interface SourceObject {
    sourceArray: {stringProp: string}[];
    sourceString: string;
};

interface TargetObject {
    firstArrayString: string;
    allArrayStrings: string[];
    targetString: string;
    targetString1: string;
};

@Service()
export class MyService {

	// Aquí vamos a guardar una función que recibe SourceObject
	// y los convierte a  TargetObject
	private customMapping: ObjectMapping<SourceObject, TargetObject>;

	constructor(
		private objectMapper: ObjectMapper
	) {

		const mapping = {
			// Podemos hacer referencia a posiciones del array
			['sourceArray[0].stringProp']: 'firstArrayString',
			// Ó podemos hacer referencia a un atributo de los objetos del array
			['sourceArray[].stringProp']: 'allArrayStrings',
			// Como valor de un atributo podemos definir un array, para que se aplique más de 1 transformación
			sourceString: [
				// Transformación simple a un atributo de salida
				'targetString',
				// Si ponemos un objeto como este, podemos definir una función de transformación
				{  key: 'targetString1', transform: (val: string) => `${val}1` }
			]
		};
		this.customMapping = this.objectMapper.createMapping(mapping);

	}

	public transform(sourceObject: SourceObject): TargetObject {
		// Ahora podemos usar esa función precompialda donde queramos
		return this.customMapping(sourceObject);
	}

}


(async () => {

	// Ejemplo usando un servicio que implementa la transformación
	const myService = await Container.get(MyService);

	const sourceObject = {
		sourceArray: [
			{stringProp: 's1'},
			{stringProp: 's2'}
		],
		sourceString: 'base'
	};
	const targetObject = myService.transform(sourceObject);
	console.log(JSON.stringify(targetObject, undefined, '\t'));

})().then().catch(console.error)
