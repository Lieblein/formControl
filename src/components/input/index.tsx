import React from "react";
import { BemComponent, IBemProps } from "../../model/bem-component";
import { IFormControl } from "../../model/form";
import "./input.pcss";

export interface IInputProps extends IBemProps {
    label?: string;
    formControl: IFormControl<string>;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default class Input extends BemComponent<IInputProps> {
    constructor(props: Readonly<IInputProps>) {
        super(props, "input");
    }

    render() {
        const {
            label,
            formControl: {
                name,
                value,
                error,
                valid,
                dirty,
            },
            onChange,
        } = this.props;

        return (
            <div className={ this.bemCn() }>
                {
                    label && label !== "" &&
                    <label
                        className={ this.bemCn("label") }
                        htmlFor={ name }
                    >
                        { label }
                    </label>
                }
                <input
                    className={ this.bemCn("input", {
                        error: dirty && !valid,
                        success: dirty && valid,
                    }) }
                    name={ name }
                    id={ name }
                    value={ value }
                    onChange={ onChange }
                />
                {
                    error !== "" && !valid && dirty &&
                        <div className={ this.bemCn("error") }>
                            { error }
                        </div>
                }
            </div>
        );
    }
}
