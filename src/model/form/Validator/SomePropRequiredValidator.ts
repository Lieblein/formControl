import { IValidator, ValidatorName } from "./";

export default class SomePropRequiredValidator implements IValidator<object> {
    get name() {
        return ValidatorName.SomeObjectPropRequired;
    }

    get error(): string {
        return "Заполните хотя бы 1 поле";
    }

    checkFn(value: object): boolean {
        return Object.keys(value).some((propName: string) => {
            const propValue = value[propName];
            return !!propValue;
        });
    }
}
