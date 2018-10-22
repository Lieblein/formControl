import { IValidator } from "./validator";

export interface IFormControl<ValueType = string> {
    name: string;
    value: ValueType;
    error: string;
    valid: boolean;
    changed: boolean;
    dirty: boolean;
}

export class FormControl<ValueType = string> implements IFormControl<ValueType> {
    readonly name: string;
    private readonly defaultValue: ValueType;
    private readonly validator: Array<IValidator<ValueType>> | IValidator<ValueType> | null;

    private _value: ValueType;
    get value(): ValueType {
        return this._value;
    }
    set value(newValue: ValueType) {
        this._value = newValue;
        this._dirty = true;
        this._changed = !this.valueCompareFn(this.defaultValue, newValue);
        const invalidValidator = this.getFirstInvalidValidator();
        if (invalidValidator === null) {
            this._error = "";
            this._valid = true;
        } else {
            this._error = invalidValidator.error;
            this._valid = false;
        }
    }

    private _changed: boolean;
    get changed(): boolean {
        return this._changed;
    }

    private _error: string;
    get error(): string {
        return this._error;
    }

    private _valid: boolean;
    get valid(): boolean {
        return this._valid;
    }

    private _dirty: boolean;
    get dirty(): boolean {
        return this._dirty;
    }

    constructor(
        name: string,
        value: ValueType,
        validator: Array<IValidator<ValueType>> | IValidator<ValueType> | null = null,
        valueCompareFn: ((a: ValueType, b: ValueType) => boolean) | null = null,
    ) {
        this.name = name;
        this.defaultValue = value;
        this.validator = validator;
        if (valueCompareFn != null) {
            this.valueCompareFn = valueCompareFn;
        }
        this.value = value;
        this._dirty = false;
    }

    private readonly valueCompareFn = function valueCompareFn(a: ValueType, b: ValueType): boolean {
        return a === b;
    };

    private getFirstInvalidValidator(): IValidator<ValueType> | null {
        if (this.validator === null) {
            return null;
        }

        const validators: Array<IValidator<ValueType>> =
            Array.isArray(this.validator) ? this.validator : [this.validator];
        const invalidValidators = validators.filter((validator: IValidator<ValueType>) => {
            const valid = validator.checkFn(this._value);
            return !valid;
        });
        return invalidValidators.length > 0 ? invalidValidators[0] : null;
    }
}
