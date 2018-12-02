import { IValidator } from "./Validator";
import { Validable } from "./Validable";
import { IError } from "./Error";

export interface IFormControl<ValueType> {
    /** Уникальный ключ поля в пределах формы */
    name: string;

    /** Актуальное значение */
    value: ValueType;

    /** Содержит сообщение об ошибке, если поле невалидно */
    error: IError | null;

    /** Флаг, показывающий, что value заполнено корректно */
    valid: boolean;

    /** Флаг, показывающий, что value было изменено хотя бы 1 раз */
    dirty: boolean;
}

export class FormControl<ValueType> extends Validable<ValueType> implements IFormControl<ValueType> {
    readonly name: string;
    private readonly _defaultValue: ValueType;

    get value(): ValueType {
        return this._value;
    }
    set value(newValue: ValueType) {
        this._value = newValue;
        this.checkValue();
        this._dirty = true;
    }

    private _dirty = false;
    get dirty(): boolean {
        return this._dirty;
    }

    constructor(
        name: string,
        value: ValueType,
        validator: Array<IValidator<ValueType>> | IValidator<ValueType> | null = null,
    ) {
        super(validator);
        this._value = value;
        this.checkValue();
        this.name = name;
        this._defaultValue = value;
    }

    reset() {
        this.value = this._defaultValue;
        this._dirty = false;
    }
}
