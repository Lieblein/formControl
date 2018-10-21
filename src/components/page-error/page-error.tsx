import React from "react";
import { Link } from "react-router-dom";
import { BemComponent, BemProps } from "../bem-component";
import { MAIN_PAGE_ROUTE } from "../../constants/routes";

export default class PageError extends BemComponent<BemProps> {
    render() {
        return (
            <div className={ this.bemCn() }>
                <h1 className={ this.bemCn("header") }>
                    Такой страницы не существует :(
                </h1>
                <Link to={ MAIN_PAGE_ROUTE }>На главную страницу</Link>
            </div>
        );
    }
}
