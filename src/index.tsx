import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppContainer } from "react-hot-loader";

import App from "./components/app";
import configureStore from "./store";

const appStore = configureStore();
const mountNode = document.getElementById("react-app");

const Application = () => (
    <Provider store={ appStore }>
        <BrowserRouter basename="/">
            <App />
        </BrowserRouter>
    </Provider>
);

const renderApplication = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        mountNode,
    );
};

renderApplication(Application);

if (module["hot"]) {
    module["hot"].accept("./components/app", () => renderApplication(Application));
}
