import { IValidator, ValidatorName } from "./";

export default class MinLengthValidator implements IValidator<string> {
    private readonly _minLength;

    get name() {
        return ValidatorName.MinLength;
    }

    get error(): string {
        return `Должно быть не менее ${this._minLength} символов`;
    }

    constructor(minLength: number) {
        this._minLength = minLength;
    }

    checkFn = function checkFn(value: string): boolean {
        return value === "" || value.trim().length >= this._minLength;
    };
}
