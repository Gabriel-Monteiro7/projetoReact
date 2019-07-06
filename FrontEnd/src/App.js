import React, { Component } from "react";
import "./App.css";
import Transportadora from "./transportadora/index";


class App extends Component {
  render() {
    return (
      <div>
        <Transportadora />
        {/* <Switch>
          <Route exact path="/" component={Visualizacao} />
          <Route path="/cadastro" component={Cadastro} />
          <Redirect from = "*" to = "/"/>
        </Switch> */}
      </div>
    );
  }
}
export default App;
