import React, { Component } from "react";
import { Provider } from "react-redux";
import "./App.css";
import store from "./store";
import Transportadora from "./transportadora/index";

// import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Transportadora />
      </Provider>
    );
  }
}
export default App;
