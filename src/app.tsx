import * as React from "react";
import { Provider } from "react-redux";

import store from "./store";

import Nav from "./components/nav";
import Canvas from "./components/canvas";

import "./app.less";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app__container">
          <div className="app_nav__container">
            <Nav />
          </div>
          <div className="app_content__container">
            <Canvas></Canvas>
          </div>
        </div>
      </Provider>
    );
  }
}
