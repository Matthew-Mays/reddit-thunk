import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import Reddit from "./Reddit";
import { getPosts } from "./actions";
import "./index.css";

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POSTS_BEGIN":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_POSTS_SUCCESS":
      return {
        ...state,
        posts: action.posts,
        isLoading: false,
      };
    case "GET_POSTS_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

const composedEnhancer = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const store = createStore(reducer, composedEnhancer);
store.dispatch({ type: "FOO" });
store.dispatch(getPosts());

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Reddit />
  </Provider>
);
