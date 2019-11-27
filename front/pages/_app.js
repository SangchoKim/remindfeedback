import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';
import AppHeader from '../components/AppHeader';

const RemindFeedback = ({Component, store, pageProps }) => {
    return(
        <> 
            <Provider store={store}>
                <AppHeader/>
                <Component {...pageProps}/>
            </Provider>
        </>
    )
}

RemindFeedback.propTypes = {
    Component: PropTypes.elementType.isRequired,
    store: PropTypes.object.isRequired,
};

RemindFeedback.getInitialProps = async(context) => {
    const { ctx, Component } = context;
    // console.log(context);
    let pageProps = {};
    if(Component.getInitialProps){
        pageProps = await Component.getInitialProps(ctx);
    }
    return {pageProps};
}

const configureStore = (initialState,options) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : compose(
      applyMiddleware(...middlewares),
      !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    );
    const store = createStore(reducer, initialState, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
}

export default withRedux(configureStore)(withReduxSaga(RemindFeedback));


