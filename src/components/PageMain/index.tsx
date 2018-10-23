import React from "react";
import { BemComponent, IBemProps } from "../../model/bem-component";
import { Form, FormControl, RequiredValidator, MinLengthValidator } from "../../model/form";
import Input from "../input";
import "../../assets/styles/button.pcss";
import "./page-main.pcss";

interface IPageMainState {
    loginForm: Form;
}

export default class PageMain extends BemComponent<IBemProps, IPageMainState> {
    state = {
        loginForm: new Form([
            new FormControl(
                "login",
                "",
                [
                    new RequiredValidator(),
                    new MinLengthValidator(3),
                ],
            ),
            new FormControl(
                "password",
                "",
                [
                    new RequiredValidator(),
                    new MinLengthValidator(6),
                ],
            ),
        ]),
    };

    constructor(props: Readonly<IBemProps>) {
        super(props, "page-main");
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { loginForm } = this.state;
        const { name, value } = event.target;
        const control = loginForm.getControl(name);
        control.value = value;
        loginForm.setControl(control);
        this.forceUpdate();
    }

    onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        alert("submited");
        this.state.loginForm.reset();
        this.forceUpdate();
    }

    render() {
        const { loginForm } = this.state;
        return (
            <div className={ this.bemCn() }>
                <form>
                    <Input
                        className={ this.bemCn("input") }
                        label="login"
                        formControl={ loginForm.getControl("login") }
                        onChange={ this.onChange }
                    />
                    <Input
                        className={ this.bemCn("input") }
                        label="password"
                        formControl={ loginForm.getControl("password") }
                        onChange={ this.onChange }
                    />
                    <button
                        className={ this.bemCn("button") + " button" }
                        type="submit"
                        disabled={ loginForm.disabled }
                        onClick={ this.onSubmit }
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}
