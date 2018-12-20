import * as React from "react";
import {mount} from "enzyme";
import FormLogin from "./";

describe("FormLogin", () => {
    test("должен сущестовать", () => {
        const wrapper = mount(<FormLogin />);
        expect(wrapper.length).toBe(1);
    });
});
