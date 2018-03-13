import './styles/global.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';

import reducers from './view/reducers'
import Root from './view/root';

const mountElement = document.getElementById('mount');

let store = createStore(
    reducers,
    /**
     * Conditionally add the Redux DevTools extension enhancer
     * if it is installed.
     */
    compose(window.devToolsExtension ? window.devToolsExtension() : f => f)
);

function renderReact(RootComponent) {
    ReactDOM.render(
        <Provider store={store}>
            <RootComponent />
        </Provider>,
        mountElement,
    );
}

renderReact(Root);
