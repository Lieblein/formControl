import { IValidator } from "./";

export default class RequiredValidator<ValueType = string> implements IValidator<ValueType> {
    name: "required";

    get error(): string {
        return "Заполните поле";
    }

    checkFn = function checkFn(value: ValueType): boolean {
        if (Array.isArray(value) && value.length > 0) {
            return false;
        }

        return !!value;
    };
}
