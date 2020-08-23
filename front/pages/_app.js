import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { Container } from "next/app";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import reducer from "../reducers";
import rootSaga from "../sagas";
import AppHeader from "../components/AppHeader";
import { FEEDBACK_SUB_READ_REQUEST } from "../reducers/feedbackSubject";
import { FEEDBACK_READ_REQUEST } from "../reducers/feedback";
import GlobalStyle from "../css/Index";

const RemindFeedback = ({ Component, store, pageProps }) => {
  return (
    <>
      {/* <Container> */}
      <Provider store={store}>
        <GlobalStyle />
        <AppHeader />
        <Component {...pageProps} />
      </Provider>
      {/* </Container> */}
    </>
  );
};

RemindFeedback.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object.isRequired,
};

RemindFeedback.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};
  const { feedbackMode } = ctx.store.getState();
  const feedbackModes = feedbackMode.feedbackMode;
  const lastId = 0;
  const cookie = ctx.isServer ? ctx.req.headers.cookie : "";
  if (ctx.isServer && cookie) {
    // 서버사이드 렌더링
    console.log("쿠키를 넣어준다....");
    axios.defaults.headers.Cookie = cookie;
  }

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          !options.isServer &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : (f) => f
        );
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configureStore)(withReduxSaga(RemindFeedback));
