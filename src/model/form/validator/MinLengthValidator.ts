import { IValidator } from "./";

export default class MinLengthValidator implements IValidator {
    name: "minLength";
    private readonly _minLength;

    get error(): string {
        return `Должно быть не менее ${this._minLength} символов`;
    }

    constructor(minLength: number) {
        this._minLength = minLength;
    }

    checkFn = function checkFn(value: any): boolean {
        return (value + "").trim().length >= this._minLength;
    };
}
