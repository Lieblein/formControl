import React from "react";
import { BemComponent, IBemProps } from "../../model/bem-component";
import { IFormControl } from "../../model/form";
import Input from "../input";
import "./page-main.pcss";

interface IPageMainState {
    login: IFormControl;
}

export default class PageMain extends BemComponent<IBemProps, IPageMainState> {
    state = {
        login: {
            name: "login",
            defaultValue: "",
            value: "",
            error: "",
            valid: false,
            changed: false,
        },
    };

    constructor(props: Readonly<IBemProps>) {
        super(props, "page-main");
    }

    render() {
        return (
            <div className={ this.bemCn() }>
                <Input
                    className={ this.bemCn("login") }
                    label="login"
                    formControl={ this.state.login }
                />
            </div>
        );
    }
}
