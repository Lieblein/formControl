import React from "react";
import { BemComponent, BemProps } from "../bem-component";

export default class PageMain extends BemComponent<BemProps> {
    constructor(props: Readonly<BemProps>) {
        super(props, "week-row");
    }

    render() {
        return (
            <div className={ this.bemCn() }>
                <h1 className={ this.bemCn("header") }>
                    best stub ever
                </h1>
            </div>
        );
    }
}
