import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import * as reducers from './reducers';
import AlberoApp from './containers/AlberoApp';

const store = createStore(
    reducers.default,
    reducers.InitialActionState,
    applyMiddleware(thunkMiddleware));

let render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <AlberoApp />
        </Provider>,
        document.getElementById('albero-window')
    );
}
render();
