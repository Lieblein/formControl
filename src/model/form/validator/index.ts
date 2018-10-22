import MinLengthValidator from "./MinLengthValidator";
import RequiredValidator from "./RequiredValidator";

export {
    MinLengthValidator,
    RequiredValidator,
};

export interface IValidator<ValueType = string> {
    name: string;
    error: string;
    checkFn: (value: ValueType) => boolean;
}
