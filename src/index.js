import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Router from './Router.js';
import * as serviceWorker from './serviceWorker';
import { AppStore, Persistor } from './stores/AppStore.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// @TODO implement a loading screen
function loading() {
    return <div>loading!</div>;
}

ReactDOM.render(
    <Provider store={AppStore}>
        <PersistGate persistor={Persistor} loading={loading()}>
            <Router />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
