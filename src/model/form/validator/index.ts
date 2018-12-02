import MinLengthValidator from "./MinLengthValidator";
import RequiredValidator from "./RequiredValidator";
import SomePropRequiredValidator from "./SomePropRequiredValidator";

export {
    MinLengthValidator,
    RequiredValidator,
    SomePropRequiredValidator,
};

export interface IValidator<ValueType> {
    readonly name: ValidatorName;
    readonly error: string;
    checkFn: (value: ValueType) => boolean;
}

export enum ValidatorName {
    MinLength = "minLength",
    Required = "required",
    SomeObjectPropRequired = "someObjectPropRequired",
}
