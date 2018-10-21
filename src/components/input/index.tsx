import React from "react";
import { BemComponent, IBemProps } from "../../model/bem-component";
import { IFormControl } from "../../model/form";
import "./input.pcss";

export interface IInputProps extends IBemProps {
    label?: string;
    formControl: IFormControl;
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
                changed,
            },
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
                        error: changed && !valid,
                        success: changed && valid,
                    }) }
                    name={ name }
                    id={ name }
                    value={ value }
                />
                {
                    error !== "" && !valid && changed &&
                        <div className={ this.bemCn("error") }>
                            { error }
                        </div>
                }
            </div>
        );
    }
}
