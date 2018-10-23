import { IValidator } from "./validator";

export interface IFormControl<ValueType = string> {
    /** Унимальный ключ поля в пределах формы */
    name: string;

    /** Актуальное значение */
    value: ValueType;

    /** Содеждит сообщение об ошибке или "", если поле валидно */
    error: string;

    /** Флаг, покзывающий, что value заполнено корректно */
    valid: boolean;

    /** Флаг, покзывающий, что value не совпадает с изначальным значением value */
    changed: boolean;

    /** Флаг, покзывающий, что value было изменено хотя бы 1 раз */
    dirty: boolean;
}

export class FormControl<ValueType = string> implements IFormControl<ValueType> {
    readonly name: string;
    private readonly _defaultValue: ValueType;
    private readonly _validator: Array<IValidator<ValueType>> | IValidator<ValueType> | null = null;

    private _value: ValueType;
    get value(): ValueType {
        return this._value;
    }
    set value(newValue: ValueType) {
        this._value = newValue;
        this.checkValue();
        this._changed = !this.valueCompareFn(this._defaultValue, newValue);
        this._dirty = true;
    }

    private _changed = false;
    get changed(): boolean {
        return this._changed;
    }

    private _error = "";
    get error(): string {
        return this._error;
    }

    private _valid = false;
    get valid(): boolean {
        return this._valid;
    }

    private _dirty = false;
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
        this._defaultValue = value;
        this._validator = validator;
        if (valueCompareFn != null) {
            this.valueCompareFn = valueCompareFn;
        }
        this._value = value;
        this.checkValue();
    }

    private readonly valueCompareFn = function valueCompareFn(a: ValueType, b: ValueType): boolean {
        return a === b;
    };

    private checkValue() {
        const invalidValidator = this.getFirstInvalidValidator();
        if (invalidValidator === null) {
            this._error = "";
            this._valid = true;
        } else {
            this._error = invalidValidator.error;
            this._valid = false;
        }
    }

    private getFirstInvalidValidator(): IValidator<ValueType> | null {
        if (this._validator === null) {
            return null;
        }

        const validators: Array<IValidator<ValueType>> =
            Array.isArray(this._validator) ? this._validator : [this._validator];
        const invalidValidators = validators.filter((validator: IValidator<ValueType>) => {
            const valid = validator.checkFn(this._value);
            return !valid;
        });
        return invalidValidators.length > 0 ? invalidValidators[0] : null;
    }
}
