import React, { Component } from 'react';
import './App.css';
import { Nav, Navbar } from 'react-bootstrap';
import UserCrud from './components/UserCrud'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      opcao:1
    }
  }
  trocarTela = (op) =>{
    this.setState({
      ...this.state,
      opcao:op,
      
    })
  }
  render() {
    return (
      <div>
        <div className="App colums">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link className="nav-link" onClick = {() => this.trocarTela(1)}>Visualizacao</Nav.Link>
                <Nav.Link className="nav-link" onClick = {() => this.trocarTela(2)}>Cadastro</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <br />
          <UserCrud opcao = {this.state.opcao}/>
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
