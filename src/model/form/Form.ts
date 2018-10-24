import { FormControl } from "./FormControl";

export class Form {
    private readonly controls = new Map</** name */ string, FormControl<any>>();

    get changed(): boolean {
        return Array.from(this.controls).some(([name, control]) => control.changed);
    }

    get valid(): boolean {
        return Array.from(this.controls).every(([name, control]) => control.valid);
    }

    get disabled(): boolean {
        return !this.changed || !this.valid;
    }

    get value(): {} {
        const value = {};
        this.controls.forEach((control) => value[control.name] = control.value);
        return value;
    }
    set value(newValue: {}) {
        Object.keys(newValue).forEach((controlName: string) => {
            const control = this.getControl(controlName);
            control.value = newValue[controlName];
        });
    }

    constructor(controls: Array<FormControl<any>>) {
        controls.forEach((control) => this.setControl(control));
    }

    setControl(control: FormControl<any>) {
        this.controls.set(control.name, control);
    }

    getControl(name: string): FormControl<any> {
        if (this.controls.has(name)) {
            return this.controls.get(name);
        } else {
            throw new Error(`Форма не содержит полей с иненем ${name}`);
        }
    }

    deleteControl(name: string) {
        if (this.controls.has(name)) {
            this.controls.delete(name);
        } else {
            throw new Error(`Форма не содержит полей с иненем ${name}`);
        }
    }

    reset() {
        this.controls.forEach((control) => control.reset());
    }
}
