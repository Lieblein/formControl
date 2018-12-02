import { IValidator, ValidatorName } from "./";

export default class RequiredValidator<ValueType = string> implements IValidator<ValueType> {
    get name() {
        return ValidatorName.Required;
    }

    get error() {
        return "Заполните поле";
    }

    checkFn = function checkFn(value: ValueType): boolean {
        if (Array.isArray(value) && value.length > 0) {
            return false;
        }

        return !!value;
    };
}
