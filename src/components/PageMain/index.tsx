import React from "react";
import { BemComponent, IBemProps } from "../../model/bem-component";
import FormLogin from "../FormLogin";
import FormProfile from "../FormProfile";
import FormFilter from "../FormFilter";
import "./page-main.pcss";

export default class PageMain extends BemComponent<IBemProps> {
    constructor(props: Readonly<IBemProps>) {
        super(props, "page-main");
    }

    render() {
        return (
            <div className={ this.bemCn() }>
                <section className={ this.bemCn("section") }>
                    <h3 className={ this.bemCn("section-header") }>
                        Обычная форма
                    </h3>
                    <FormLogin className={ this.bemCn("form") } />
                </section>
                <hr className={ this.bemCn("separator") } />
                <section className={ this.bemCn("section") }>
                    <h3 className={ this.bemCn("section-header") }>
                        Зависимые поля
                    </h3>
                    <FormProfile className={ this.bemCn("form") } />
                </section>
                <hr className={ this.bemCn("separator") } />
                <section className={ this.bemCn("section") }>
                    <h3 className={ this.bemCn("section-header") }>
                        Хотя бы одно
                    </h3>
                    <FormFilter className={ this.bemCn("form", { big: true }) } />
                </section>
            </div>
        );
    }
}
