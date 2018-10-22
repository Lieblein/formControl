import React from "react";
import { BemComponent, IBemProps } from "../../model/bem-component";
import { FormControl, RequiredValidator, MinLengthValidator } from "../../model/form";
import Input from "../input";
import "./page-main.pcss";

interface IPageMainState {
    login: FormControl;
}

function hasNotNumber(value: string): boolean {
    return !(new RegExp(/\d/).test(value));
}

export default class PageMain extends BemComponent<IBemProps, IPageMainState> {
    state = {
        login: new FormControl(
            "login",
            "",
            [
                new RequiredValidator(),
                new MinLengthValidator(3),
                {
                    name: "not-number",
                    error: "Не должно быть цифр",
                    checkFn: hasNotNumber,
                },
            ],
        ),
    };

    constructor(props: Readonly<IBemProps>) {
        super(props, "page-main");
    }

    onChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        const login = this.state.login;
        login.value = event.target.value;
        this.setState({ login });
    }

    render() {
        return (
            <div className={ this.bemCn() }>
                <Input
                    className={ this.bemCn("login") }
                    label="login"
                    formControl={ this.state.login }
                    onChange={ this.onChangeLogin }
                />
            </div>
        );
    }
}
