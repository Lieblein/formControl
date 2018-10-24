import React from "react";
import { BemComponent, IBemProps } from "../../model/bem-component";
import { Form, FormControl, RequiredValidator, MinLengthValidator } from "../../model/form";
import Input from "../Input";
import "../../assets/styles/button.pcss";
import "./form-login.pcss";

interface IFormLoginState {
    form: Form;
}

export default class FormLogin extends BemComponent<IBemProps, IFormLoginState> {
    state = {
        form: new Form([
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
        super(props, "form-login");
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { form } = this.state;
        const { name, value } = event.target;
        const control = form.getControl(name);
        control.value = value;
        form.setControl(control);
        this.forceUpdate();
    }

    onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        alert("submited");
        this.state.form.reset();
        this.forceUpdate();
    }

    render() {
        const { form } = this.state;
        return (
            <form className={ this.bemCn() }>
                <Input
                    className={ this.bemCn("input") }
                    label="login"
                    formControl={ form.getControl("login") }
                    onChange={ this.onChange }
                />
                <Input
                    className={ this.bemCn("input") }
                    label="password"
                    formControl={ form.getControl("password") }
                    onChange={ this.onChange }
                />
                <button
                    className={ this.bemCn("button") + " button" }
                    type="submit"
                    disabled={ form.disabled }
                    onClick={ this.onSubmit }
                >
                    Submit
                </button>
            </form>
        );
    }
}
