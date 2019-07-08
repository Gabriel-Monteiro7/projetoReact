import React, { Component } from "react";
import "./App.css";
import Transportadora from "./transportadora/index";

import store from './store'
import { Provider } from 'react-redux'
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
