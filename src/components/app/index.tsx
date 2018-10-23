import React from "react";
import { Route, Switch } from "react-router-dom";

import PageMain from "../PageMain";
import PageError from "../PageError";
import { MAIN_PAGE_ROUTE } from "../../constants/routes";
import "./app.pcss";

export default class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Switch>
                    <Route
                        exact={ true }
                        path={ MAIN_PAGE_ROUTE }
                        component={ PageMain }
                    />
                    <Route
                        path="*"
                        component={ PageError }
                    />
                </Switch>
            </div>
        );
    }
}
