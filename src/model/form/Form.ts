import { FormControl } from "./FormControl";
import { IValidator } from "./Validator";
import { Validable } from "./Validable";

export class Form<ValueType = object> extends Validable<ValueType> {
    private readonly _controls = new Map</** name */ string, FormControl<any>>();

    get dirty(): boolean {
        return Array.from(this._controls).some(([name, control]) => control.dirty);
    }

    get disabled(): boolean {
        return !this.dirty || !this.valid;
    }

    get value(): ValueType {
        const value = {} as ValueType;
        this._controls.forEach((control) => value[control.name] = control.value);
        return value;
    }
    set value(newValue: ValueType) {
        Object.keys(newValue).forEach((controlName: string) => {
            const control = this.getControl(controlName);
            control.value = newValue[controlName];
        });
        this._checkValue();
    }

    constructor(
        controls: Array<FormControl<any>>,
        validator: Array<IValidator<ValueType>> | IValidator<ValueType> | null = null,
    ) {
        super(validator);
        this._value = {} as ValueType;
        controls.forEach((control) => this.setControl(control));
    }

    setControl(control: FormControl<any>) {
        this._controls.set(control.name, control);
        this._value[control.name] = control.value;
        this._checkValue();
    }

    getControl(name: string): FormControl<any> {
        if (this._controls.has(name)) {
            return this._controls.get(name);
        } else {
            throw new Error(`Форма не содержит полей с именем ${name}`);
        }
    }

    deleteControl(name: string) {
        if (this._controls.has(name)) {
            this._controls.delete(name);
            this._value[name] = undefined;
            this._checkValue();
        } else {
            throw new Error(`Форма не содержит полей с именем ${name}`);
        }
    }

    reset() {
        this._controls.forEach((control) => {
            control.reset();
            this._value[control.name] = control.value;
            this._checkValue();
        });
    }

    private _checkValue() {
        const invalidControl = Array.from(this._controls).find(([name, control]) => !control.valid);
        if (invalidControl) {
            this._valid = false;
            this._error = invalidControl[1].error;
        } else {
            this.checkValue();
        }
    }
}
