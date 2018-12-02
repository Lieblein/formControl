import {IValidator, ValidatorName} from "./validator";
import {IError} from "./Error";

export abstract class Validable<ValueType> {
    protected _validators: Map</** name */string, IValidator<ValueType>> = new Map();
    protected _value: ValueType;

    protected _error: IError | null = null;
    get error(): IError {
        return this._error;
    }

    protected _valid = false;
    get valid(): boolean {
        return this._valid;
    }

    constructor(
        validator: Array<IValidator<ValueType>> | IValidator<ValueType> | null = null,
    ) {
        this._validators = this._mapValidator(validator);
    }

    setAllValidators(validator: Array<IValidator<ValueType>> | IValidator<ValueType> | null) {
        this._validators = this._mapValidator(validator);
        this.checkValue();
    }

    resetAllValidators() {
        this._validators.clear();
        this.checkValue();
    }

    setValidator(validator: IValidator<ValueType>) {
        this._validators.set(validator.name, validator);
        this.checkValue();
    }

    deleteValidator(validatorName: ValidatorName) {
        this._validators.delete(validatorName);
        this.checkValue();
    }

    protected checkValue() {
        const invalidValidator = this._getFirstInvalidValidator();
        if (invalidValidator === null) {
            this._error = null;
            this._valid = true;
        } else {
            const { error, name } = invalidValidator;
            this._error = { text: error, name };
            this._valid = false;
        }
    }

    private _mapValidator(
        validator: Array<IValidator<ValueType>> | IValidator<ValueType> | null,
    ): Map<string, IValidator<ValueType>> {
        const validators: Map<string, IValidator<ValueType>> = new Map();
        if (validator !== null) {
            if (Array.isArray(validator)) {
                validator.forEach((_) => validators.set(_.name, _));
            }  else {
                validators.set(validator.name, validator);
            }
        }
        return validators;
    }

    private _getFirstInvalidValidator(): IValidator<ValueType> | null {
        const invalidValidator = Array.from(this._validators)
            .map(([name, validator]) => validator)
            .find((validator) => {
                const valid = validator.checkFn(this._value);
                return !valid;
            });
        return invalidValidator || null;
    }
}
