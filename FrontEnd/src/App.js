import React, { Component } from 'react';
import './App.css';

import UserCrud from './components/UserCrud'


class App extends Component {

  render() {
    return (
      <div>
        <div className="App colums">
          <UserCrud />
        </div >

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
