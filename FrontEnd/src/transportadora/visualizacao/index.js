/* eslint-disable no-restricted-globals */
import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions/todos";
import "../../App.css";
import ModalNew from "../../presentationals/modal";
import Pagination from "../../presentationals/pagination";
import { deleteUser, selectUser } from "../../utils/request";

class Visualizacao extends Component {
  state = {
    value: false
  };
  removeUser = item => {
    let data = this.props.store.data;
    if (confirm("Você deseja mesmo excluir o usuario?")) {
      deleteUser(item).then(function(response) {});
      this.props.deleteUser(item);
      alert("Dado deletado com sucesso");
      if (data.values.length % data.quantity === 1 || data.quantity === 1) {
        this.pagination(0, data.quantity);
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
  getIndice = indice => {
    this.props.indexUser(this.props.store.data.values[indice]);
    this.modal(true);
  };
  modal = (value, indice) => {
    this.setState({ value: value });
  };
  render() {
    return (
      <div className="container">
        <h1>Lista de cadastro</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              {this.props.colunas.map((item, key) => (
                <th key={key}> {item} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.store.data.values.map((item, indice) => (
              <tr key={indice}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.cnpj}</td>
                <td>{item.inscricaoEstadual}</td>
                <td>{item.latitude}</td>
                <td>{item.longitude}</td>
                <td id="btn">
                  <Button
                    variant="btn btn-outline-primary btn-sm"
                    onClick={() => this.getIndice(indice)}
                  >
                    Update
                  </Button>{" "}
                  <Button
                    variant="btn btn-outline-danger btn-sm"
                    onClick={() => this.removeUser(item)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          pagination={(inicio, fim) => this.pagination(inicio, fim)}
          allValues={this.props.store.data.allValues}
          quantity={this.props.store.data.quantity}
        />
        <ModalNew
          user={this.props.store.data.value}
          modal={e => this.modal(e)}
          value={this.state.value}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({ store: state });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Visualizacao);
