/* eslint-disable no-restricted-globals */
import React, { Component } from "react";
import "../App.css";
import NavBar from "../presentationals/navbar";
import Footer from "../presentationals/footer";
import {
  deleteUser,
  insertUser,
  selectAllUser,
  selectUser,
  updateUser
} from "../utils/request";
import { Redirect, Route, Switch } from "react-router-dom";
import Cadastro from "./cadastro/index";
import Visualizacao from "./visualizacao/index";

import { bindActionCreators } from "redux";
import * as Actions from "../actions/todos";
import { connect } from "react-redux";

class Transportadora extends Component {
  state = {
    inicio: 0,
    fim: 10
  };
  componentWillMount() {
    selectAllUser().then(response => {
      this.props.selectAll(response.data);
      this.pagination(0, this.props.store.data.quantity);
    });
  }
  save = (item, indice) => {
    if (indice !== undefined) {
      updateUser(item).then(response => {});
      this.pagination(this.state.inicio, this.state.fim);
    } else {
      insertUser(item).then(response => {
      });
      this.props.addUser(item);
    }

  };
  removeUser = item => {
    if (confirm("Você deseja mesmo excluir o usuario?")) {
      deleteUser(item).then(function(response) {});
      this.props.deleteUser(item);
      alert("Dado deletado com sucesso");
      if (
        this.props.store.data.values.length % this.props.store.data.quantity === 1 ||
        this.props.store.data.quantity === 1
      ) {
        window.location.reload();
      }
    }
  };
  pagination(inicio, fim) {
    let allUsers = this.props.store.data.allValues;
    if (allUsers.length < this.props.store.data.quantity) {
      //Ate o vetor atingir o tamanho de  quantity
      fim = allUsers.length;
      inicio = 0;
    } else if (fim > allUsers.length) {
      //Corrigir o final
      fim = allUsers.length;
    }
    if (inicio === undefined) {
      //Para o botão last
      let ultimaPosicao =
        allUsers.length - (allUsers.length % this.props.store.data.quantity);
      inicio =
        ultimaPosicao === fim
          ? fim - this.props.store.data.quantity
          : ultimaPosicao;
    }
    if (allUsers.length !== 0) {
      //Para não resgar valores quando for vazio
      this.setState({ inicio, fim });
      const url = `select?inicio=${allUsers[inicio].id}&fim=${
        allUsers[fim - 1].id
      }`;
      this.updateTable(url);
    }
  }
  updateTable = url => {
    selectUser(url).then(response => {
      this.props.selectUser(response.data);
    });
  };
  render() {
    let allUsers = this.props.store.data.allValues;
    return (
      <div>
        <NavBar />
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <Visualizacao
                pagination={(inicio, fim) => this.pagination(inicio, fim)}
                users={this.props.store.data.values}
                allUsers={allUsers}
                quantity={this.props.store.data.quantity}
                colunas={[
                  "ID",
                  "NAME",
                  "CNPJ",
                  "INSCRIÇÃO ESTADUAL",
                  "LATITUDE",
                  "LONGITUDE",
                  ""
                ]}
                removeUser={item => this.removeUser(item)}
                save={(valor, indice) => this.save(valor, indice)}
              />
            )}
          />
          <Route
            path="/cadastro"
            render={props => (
              <Cadastro
                save={(valor, indice) => this.save(valor, indice)}
                label="Cadastro"
              />
            )}
          />
          <Redirect from="*" to="/" />
          {/* <Route path="/cadastro" component={Cadastro} /> */}
        </Switch>
        <Footer style ={{marginTop:this.props.store.data.values.lenght<5?"3000px":"100px"}} />
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
