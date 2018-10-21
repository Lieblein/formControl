export interface IFormControl<ValueType = string> {
    name: string;
    defaultValue: ValueType;
    value: ValueType;
    error: string;
    valid: boolean;
    changed: boolean;
}
