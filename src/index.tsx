import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import AlberoApp from "./containers/AlberoApp";
import * as reducers from "./reducers";

const store = createStore(
    reducers.default,
    reducers.InitialActionState,
    applyMiddleware(thunkMiddleware));

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <AlberoApp />
        </Provider>,
        document.getElementById("albero-window"),
    );
};
render();
