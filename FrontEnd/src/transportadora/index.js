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

const quantity = 10;
const initValue = {
  user: {
    id: undefined,
    nome: undefined,
    cnpj: undefined,
    inscricaoEstadual: undefined,
    latitude: undefined,
    longitude: undefined
  },
  users: [],
  allUsers: [{}],
  inicio: 0,
  fim: quantity,
  opcao: 1
};
class Transportadora extends Component {
  state = { ...initValue };
  changeScreen = op => {
    this.setState({
      ...this.state,
      opcao: op,
      indiceFinal:
        this.state.allUsers.length === 0
          ? 0
          : this.state.allUsers[this.state.allUsers.length - 1].id
    });
  };
  componentWillMount() {
    selectAllUser().then(response => {
      let allUsers = response.data;
      this.setState({ allUsers: allUsers.sort((a, b) => a.id - b.id) });
      this.pagination(0, quantity);
      console.log(response.data);
    });
  }
  save = (item, indice) => {
    let users = this.state.users;
    let allUsers = this.state.allUsers;
    if (indice !== undefined) {
      updateUser(item).then(response => {});
      this.pagination(this.state.inicio, this.state.fim);
    } else {
      insertUser(item).then(response => {
        this.pagination(this.state.inicio, this.state.fim);
      });
      if (this.state.users.length === quantity) allUsers.push(item);
      else {
        users.push(item);
        allUsers.push(item);
      }
    }
    this.setState({ users, allUsers });
  };
  removeUser = item => {
    if (confirm("Você deseja mesmo excluir o usuario?")) {
      deleteUser(item).then(function(response) {});
      let allUsers = this.state.allUsers;
      allUsers = allUsers.filter(user => user !== item);
      let users = this.state.users;
      users = users.filter(user => user !== item);
      this.setState({
        users,
        allUsers,
        indiceFinal: this.state.indiceFinal - 1
      });
      alert("Dado deletado com sucesso");
      if (this.state.users.length % quantity === 1 || quantity === 1) {
        window.location.reload();
      }
    }
  };
  pagination(inicio, fim) {
    let { allUsers } = this.state;
    if (allUsers.length < quantity) {
      //Ate o vetor atingir o tamanho de  quantity
      fim = allUsers.length;
      inicio = 0;
    } else if (fim > allUsers.length) {
      //Corrigir o final
      fim = allUsers.length;
    }
    if (inicio === undefined) {
      //Para o botão last
      let ultimaPosicao = allUsers.length - (allUsers.length % quantity);
      inicio = ultimaPosicao === fim ? fim - quantity : ultimaPosicao;
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
      let users = response.data;
      this.setState({ users: users.sort((a, b) => a.id - b.id) });
    });
  };
  render() {
    let { allUsers } = this.state;
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
                users={this.state.users}
                allUsers={allUsers}
                quantity={quantity}
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
                indice={this.state.indiceFinal}
                label="Cadastro"
              />
            )}
          />
          <Redirect from="*" to="/" />
          {/* <Route path="/cadastro" component={Cadastro} /> */}
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default Transportadora;
