import * as React from "react";
import * as bemCn from "bem-cn";
import get from "lodash/get";

bemCn.setup({
    el: "__",
    mod: "--",
    modValue: "-",
});

export abstract class BemComponent<P = {}, S = {}> extends React.Component<P, S> {
    private readonly block: (elemOrMods?: string | bemCn.Modifications, mods?: bemCn.Modifications) => bemCn.Inner;
    private readonly propClassName: string;

    constructor(props: Readonly<P>, blockClassName: string) {
        super(props);

        this.block = bemCn(blockClassName);
        this.propClassName = get(props, "className", "");
    }

    bemCn(elemOrMods?: string | bemCn.Modifications, mods?: bemCn.Modifications): string {
    const isBemElement = typeof elemOrMods === "string";
    if (isBemElement) {
            return this.block(elemOrMods, mods) + "";
        }
    return this.propClassName + " " + this.block(elemOrMods);
    }
}

export interface IBemProps {
    className?: string;
}
