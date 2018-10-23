import { IFormControl } from "./FormControl";
import { IValidator } from "./validator";

export class Form {
    private readonly controls = new Map</** name */ string, IFormControl<any>>();

    get changed(): boolean {
        return Array.from(this.controls).some(([name, control]) => control.changed);
    }

    get valid(): boolean {
        // TODO валидация зависимых полей
        return Array.from(this.controls).every(([name, control]) => control.valid);
    }

    get disabled(): boolean {
        return !this.changed || !this.valid;
    }

    constructor(controls: IFormControl[]) {
        controls.forEach((control) => this.setControl(control));
    }

    setControl(control: IFormControl) {
        this.controls.set(control.name, control);
    }

    getControl(name: string): IFormControl {
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
