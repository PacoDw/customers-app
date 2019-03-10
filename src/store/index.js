import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise";
import reducers from "./../reducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers, {}, composeEnhancer(applyMiddleware(promiseMiddleware))
)