import React from "react";
import { BemComponent, IBemProps } from "../../model/bem-component";
import { Form, FormControl, RequiredValidator, MinLengthValidator } from "../../model/form";
import Input from "../Input";
import "../../assets/styles/button.pcss";
import "./form-profile.pcss";

interface IFormLoginState {
    form: Form;
}

const AGE_VALIDATOR = new RequiredValidator();

export default class FormProfile extends BemComponent<IBemProps, IFormLoginState> {
    state = {
        form: new Form([
            new FormControl(
                "name",
                "",
                [
                    new RequiredValidator(),
                    new MinLengthValidator(2),
                ],
            ),
            new FormControl(
                "needAge",
                false,
                [
                    new RequiredValidator(),
                ],
            ),
            new FormControl(
                "age",
                "",
            ),
        ]),
    };

    constructor(props: Readonly<IBemProps>) {
        super(props, "form-profile");
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { form } = this.state;
        const { name, value } = event.target;
        const control = form.getControl(name);
        control.value = value;
        form.setControl(control);
        this.forceUpdate();
    }

    onChangeNeedAge = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { form } = this.state;
        const { name, checked } = event.target;
        const control = form.getControl(name);
        control.value = checked;
        form.setControl(control);
        const ageControl = form.getControl("age");
        ageControl.updateValidator(checked ? AGE_VALIDATOR : null);
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
                    className={ this.bemCn("form-group") }
                    label="name"
                    formControl={ form.getControl("name") }
                    onChange={ this.onChange }
                />
                <div className={ this.bemCn("form-group") }>
                    <input
                        className={ this.bemCn("checkbox") }
                        type="checkbox"
                        id={ form.getControl("needAge").name }
                        name={ form.getControl("needAge").name }
                        checked={ form.getControl("needAge").value }
                        onChange={ this.onChangeNeedAge }
                    />
                    <label
                        className={ this.bemCn("checkbox-label") }
                        htmlFor={ form.getControl("needAge").name }
                    >
                        need age
                    </label>
                </div>
                <Input
                    className={ this.bemCn("form-group") }
                    label="age"
                    formControl={ form.getControl("age") }
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