import { AfterTests, AsserterService, BeforeTests, Logger, Test, TestService } from "@plugcore/core";

//
// Ejecución básica
//

@TestService()
// Además para tener acceso a la propiedad "assert" debemos extender de esta clase
export class ExampleTest extends AsserterService {

	constructor(
		// Esta clase es un servicio normal y podemos importar lo que sea necesario
		private log: Logger
	) {
		// Es necesario hacer esta llamada ya que extendemos de otra clase
		super();
	}

	// Todos los métodos que queramos que se ejecuten en el test deben anotarse con "Test"
	@Test()
	public async firstTest() { // Todos los tests pueden ser "async"
		this.log.info('My first test');
		this.assert.equal(1, 1);
		this.assert.equal('1', '1');
	}

}

//
// Before y After tests
//

@TestService()
export class ExampleTest extends AsserterService {

	private myString: string;

	constructor(private log: Logger) { super();	}

	@BeforeTests()
	public async beforeTests() {
		this.myString = 'My first test';
	}

	@AfterTests()
	public async afterTests() {
		this.log.info('After tests');
	}

	@Test()
	public async firstTest() {
		this.log.info(this.myString);
		this.assert.equal(1, 1);
	}

}

//
// Focused tests
//

@TestService()
export class ExampleTest extends AsserterService {
	@Test()
	public async firstTest() {
		console.log('First'); // Sólo este se ejecutará
		this.assert.equal(1, 1);
	}
	@Test()
	public async secondTest() {
		console.log('Second'); // Sólo este se ejecutará
		this.assert.equal(1, 1);
	}
}
