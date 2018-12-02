import React from "react";
import { BemComponent, IBemProps } from "../../model/bem-component";
import {
    Form,
    FormControl,
    ValidatorName,
    SomePropRequiredValidator,
} from "../../model/form";
import Input from "../Input";
import "../../assets/styles/button.pcss";
import "./form-filter.pcss";

interface IFormValue {
    surname: string;
    name: string;
    patronymic: string;
    polis: string;
}

interface IFormLoginState {
    form: Form<IFormValue>;
}

export default class FormFilter extends BemComponent<IBemProps, IFormLoginState> {
    state = {
        form: new Form<IFormValue>(
            [
                new FormControl("surname", ""),
                new FormControl("name", ""),
                new FormControl("patronymic", ""),
                new FormControl(
                    "polis",
                    "",
                ),
            ],
            new SomePropRequiredValidator(),
        ),
    };

    constructor(props: Readonly<IBemProps>) {
        super(props, "form-filter");
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
                <div className={ this.bemCn("row") }>
                    <Input
                        className={ this.bemCn("col") }
                        label="Фпмилия"
                        formControl={ form.getControl("surname") }
                        onChange={ this.onChange }
                    />
                    <Input
                        className={ this.bemCn("col") }
                        label="Имя"
                        formControl={ form.getControl("name") }
                        onChange={ this.onChange }
                    />
                    <Input
                        className={ this.bemCn("col") }
                        label="Отчество"
                        formControl={ form.getControl("patronymic") }
                        onChange={ this.onChange }
                    />
                </div>
                <div className={ this.bemCn("row") }>
                    <Input
                        className={ this.bemCn("col", { polis: true }) }
                        label="Полис"
                        formControl={ form.getControl("polis") }
                        onChange={ this.onChange }
                    />
                    <div className={ this.bemCn("col", { button: true }) }>
                        <button
                            className={ this.bemCn("button") + " button" }
                            type="submit"
                            disabled={ form.disabled }
                            onClick={ this.onSubmit }
                        >
                            Найти
                        </button>
                        {
                            !form.valid
                            && form.dirty
                            && form.error.name === ValidatorName.SomeObjectPropRequired &&
                                <div className={ this.bemCn("error") }>
                                    {form.error.text}
                                </div>
                        }
                    </div>
                </div>
            </form>
        );
    }
}
