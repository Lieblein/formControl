import * as React from "react";
import { BemComponent, IBemProps } from "../../model/bem-component";
import { Form, FormControl, RequiredValidator, MinLengthValidator } from "../../model/form";
import Input from "../Input";
import "../../assets/styles/button.pcss";
import "./form-login.pcss";

interface IFormValue {
    login: string;
    password: string;
}

interface IFormLoginState {
    form: Form<IFormValue>;
}

export default class FormLogin extends BemComponent<IBemProps, IFormLoginState> {
    state = {
        form: new Form<IFormValue>([
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
        /* tslint:disable-next-line:no-console */
        console.dir(this.state.form.value);
        this.state.form.reset();
        this.forceUpdate();
    }

    render() {
        const { form } = this.state;
        return (
            <form className={ this.bemCn() }>
                <Input
                    className={ this.bemCn("input") }
                    label="Логин"
                    formControl={ form.getControl("login") }
                    onChange={ this.onChange }
                />
                <Input
                    className={ this.bemCn("input") }
                    label="Пароль"
                    formControl={ form.getControl("password") }
                    onChange={ this.onChange }
                />
                <button
                    className={ this.bemCn("button") + " button" }
                    type="submit"
                    disabled={ form.disabled }
                    onClick={ this.onSubmit }
                >
                    Отправить
                </button>
            </form>
        );
    }
}
