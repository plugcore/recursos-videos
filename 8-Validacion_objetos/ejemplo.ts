import { Container, Service, IsString, Required, IsNumber, IsObject, ObjectValidatorUtils, ObjectValidator } from "@plugcore/core";

class Coordinates {
	@Required() @IsNumber()
	lat: number;
	@Required() @IsNumber()
	long: number
}

class MapPoint {
	@IsString()
	name?: string
	@Required()	@IsObject(Coordinates)
	coordinates: Coordinates;
}

// En formato objeto
const mapPointSchmea = ObjectValidatorUtils.generateJsonSchema(MapPoint);
console.log(JSON.stringify(mapPointSchmea, undefined, '\t'))

// En formato array de objetos
const mapPointSchmeaAsArray = ObjectValidatorUtils.generateJsonSchema(MapPoint, { asArray: true });
console.log(JSON.stringify(mapPointSchmeaAsArray, undefined, '\t'));


@Service()
class ValidatorService {

    constructor(private objectValidator: ObjectValidator ) {}

	public validateMapPoint(object: MapPoint) {
		const mapPointValidator = this.objectValidator.
			createValidatorFromClass(MapPoint);
        const validationResult = mapPointValidator(object);
        return validationResult;
	}

}

(async () => {

	const validator = await Container.get(ValidatorService);
	const validObject: MapPoint = { name: 'ex', coordinates: { lat: 1.6, long: 35.9 } };
	const invalidObject: any = { name: 1, coordinates: { lat: 1.6 } };

	console.log(JSON.stringify(
		validator.validateMapPoint(validObject), undefined, '\t'
	));
	console.log(JSON.stringify(
		validator.validateMapPoint(invalidObject), undefined, '\t'
	));

})().then().catch(console.error)

