import React from "react";
import { BemComponent, IBemProps } from "../../model/bem-component";
import FormLogin from "../FormLogin";
import FormProfile from "../FormProfile";
import "./page-main.pcss";

export default class PageMain extends BemComponent<IBemProps> {
    constructor(props: Readonly<IBemProps>) {
        super(props, "page-main");
    }

    render() {
        return (
            <div className={ this.bemCn() }>
                <FormLogin className={ this.bemCn("login") } />
                <hr className={ this.bemCn("separator") } />
                <FormProfile className={ this.bemCn("profile") } />
            </div>
        );
    }
}
