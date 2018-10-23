import React from "react";
import { BemComponent, IBemProps } from "../../model/bem-component";
import { FormControl, RequiredValidator, MinLengthValidator } from "../../model/form";
import Input from "../input";
import "./page-main.pcss";

interface IPageMainState {
    login: FormControl;
    password: FormControl;
}

export default class PageMain extends BemComponent<IBemProps, IPageMainState> {
    state = {
        login: new FormControl(
            "login",
            "",
            [
                new RequiredValidator(),
                new MinLengthValidator(3),
            ],
        ),
        password: new FormControl(
            "password",
            "",
            [
                new RequiredValidator(),
                new MinLengthValidator(6),
            ],
        ),
    };

    constructor(props: Readonly<IBemProps>) {
        super(props, "page-main");
    }

    onChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { login } = this.state;
        login.value = event.target.value;
        this.setState({ login });
    }

    onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { password } = this.state;
        password.value = event.target.value;
        this.setState({ password });
    }

    render() {
        const { login, password } = this.state;
        return (
            <div className={ this.bemCn() }>
                <Input
                    className={ this.bemCn("input") }
                    label="login"
                    formControl={ login }
                    onChange={ this.onChangeLogin }
                />
                <Input
                    className={ this.bemCn("input") }
                    label="password"
                    formControl={ password }
                    onChange={ this.onChangePassword }
                />
            </div>
        );
    }
}
