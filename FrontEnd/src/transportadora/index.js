/* eslint-disable no-restricted-globals */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as Actions from "../actions/todos";
import "../App.css";
import Footer from "../presentationals/footer";
import NavBar from "../presentationals/navbar";
import { selectAllUser, selectUser } from "../utils/request";
import Cadastro from "./cadastro/index";
import Visualizacao from "./visualizacao/index";

class Transportadora extends Component {
  componentWillMount() {
    selectAllUser().then(response => {
      this.props.selectAll(response.data);
    });
    selectUser(`select?inicio=1&fim=10`).then(response => {
      this.props.selectUser(response.data);
    });
  }
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <Visualizacao
                colunas={[
                  "ID",
                  "NAME",
                  "CNPJ",
                  "INSCRIÇÃO ESTADUAL",
                  "LATITUDE",
                  "LONGITUDE",
                  ""
                ]}
              />
            )}
          />
          <Route
            path="/cadastro"
            render={props => <Cadastro label="Cadastro" />}
          />
          <Redirect from="*" to="/" />
          {/* <Route path="/cadastro" component={Cadastro} /> */}
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({ store: state });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transportadora);
