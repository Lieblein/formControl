import * as React from "react";
import {mount} from "enzyme";
import FormLogin from "./";

const loginSelector = 'input[name="login"]';
const passwordSelector = 'input[name="password"]';
const buttonSelector = 'button[type="submit"]';
const loginErrorSelector = 'input[name="login"] + .input__error';
const passwordErrorSelector = 'input[name="password"] + .input__error';

describe("FormLogin", () => {
    describe("button disabled", () => {
        test("кнопка должена быть заблокирована по умолчанию", () => {
            const wrapper = mount(<FormLogin/>);
            const button = wrapper.find(buttonSelector);
            expect(button.prop("disabled")).toBe(true);
        });

        test("кнопка должена быть активна после верного ввода логина и пароля", () => {
            const wrapper = mount(<FormLogin/>);

            const login = wrapper.find(loginSelector);
            login.simulate("change", {target: {value: "login", name: "login"}});
            const password = wrapper.find(passwordSelector);
            password.simulate("change", {target: {value: "password", name: "password"}});

            const button = wrapper.find(buttonSelector);
            expect(button.prop("disabled")).toBe(false);
        });

        test("кнопка должена быть заблокирована после неверного ввода логина", () => {
            const wrapper = mount(<FormLogin/>);

            const login = wrapper.find(loginSelector);
            login.simulate("change", {target: {value: "lo", name: "login"}});

            const button = wrapper.find(buttonSelector);
            expect(button.prop("disabled")).toBe(true);
        });

        test("кнопка должена быть заблокирована после неверного ввода пароля", () => {
            const wrapper = mount(<FormLogin/>);

            const password = wrapper.find(passwordSelector);
            password.simulate("change", {target: {value: "passw", name: "password"}});

            const button = wrapper.find(buttonSelector);
            expect(button.prop("disabled")).toBe(true);
        });
    });

    describe("login error", () => {
        test("поле с логином не должено иметь ошибку по умолчанию", () => {
            const wrapper = mount(<FormLogin />);
            const loginError = wrapper.find(loginErrorSelector);
            expect(loginError.exists()).toBe(false);
        });

        [
            "   ",
            "1",
            "12",
            "12 ",
            " 12",
        ].forEach((value) => test(`поле с логином должено иметь ошибку после ввода '${value}'`, () => {
            const wrapper = mount(<FormLogin/>);

            const login = wrapper.find(loginSelector);
            login.simulate("change", {target: {value, name: "login"}});

            const loginError = wrapper.find(loginErrorSelector);
            expect(loginError.exists()).toBe(true);
        }));

        test("поле с логином не должено иметь ошибку после ввода '123'", () => {
            const wrapper = mount(<FormLogin/>);

            const login = wrapper.find(loginSelector);
            login.simulate("change", {target: {value: "123", name: "login"}});

            const loginError = wrapper.find(loginErrorSelector);
            expect(loginError.exists()).toBe(false);
        });
    });

    describe("password error", () => {
        test("поле с паролем не должено иметь ошибку по умолчанию", () => {
            const wrapper = mount(<FormLogin />);
            const passwordError = wrapper.find(passwordErrorSelector);
            expect(passwordError.exists()).toBe(false);
        });

        [
            "      ",
            "12345",
            " 12345",
            "12345 ",
        ].forEach((value) => test(`поле с паролем должено иметь ошибку после ввода '${value}'`, () => {
            const wrapper = mount(<FormLogin/>);

            const password = wrapper.find(passwordSelector);
            password.simulate("change", {target: {value, name: "password"}});

            const passwordError = wrapper.find(passwordErrorSelector);
            expect(passwordError.exists()).toBe(true);
        }));

        test("поле с паролем не должено иметь ошибку после ввода '123456'", () => {
            const wrapper = mount(<FormLogin/>);

            const password = wrapper.find(passwordSelector);
            password.simulate("change", {target: {value: "123456", name: "password"}});

            const passwordError = wrapper.find(passwordErrorSelector);
            expect(passwordError.exists()).toBe(false);
        });
    });

    test("форма должена очищаться после отправки", () => {
        const wrapper = mount(<FormLogin/>);

        wrapper.find(loginSelector).simulate("change", {target: {value: "login", name: "login"}});
        wrapper.find(passwordSelector).simulate("change", {target: {value: "password", name: "password"}});
        wrapper.find(buttonSelector).simulate("click");
        expect(wrapper.find(loginSelector).prop("value")).toBe("");
        expect(wrapper.find(passwordSelector).prop("value")).toBe("");
        expect(wrapper.find(buttonSelector).prop("disabled")).toBe(true);
    });
});
