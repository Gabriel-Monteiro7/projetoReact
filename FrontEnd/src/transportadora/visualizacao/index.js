import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";
import "../../App.css";
import ModalNew from "../../presentationals/modal";
import Pagination from "../../presentationals/pagination";

import { bindActionCreators } from "redux";
import * as Actions from "../../actions/todos";
import { connect } from "react-redux";

class Visualizacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      indice: 0
    };
  }

  getIndice = indice => {
    this.setState({ indice: indice });
    this.modal(true);
  };
  modal = (value, indice) => {
    this.setState({ value: value });
  };
  render() {
    console.log(this.props.store.data)
    let { users } = this.props;
    return (
      <div className="container">
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
                <td id ="btn">
                  <Button
                    variant="btn btn-outline-primary btn-sm"
                    onClick={() => this.getIndice(indice)}
                  >
                    Update
                  </Button>{" "}
                  <Button
                    variant="btn btn-outline-danger btn-sm"
                    onClick={() => this.props.removeUser(item)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          pagination={(inicio, fim) => this.props.pagination(inicio, fim)}
          allUsers={this.props.store.data.allValue}
          {...this.props}
        />
        <ModalNew
          user={users[this.state.indice]}
          modal={e => this.modal(e)}
          value={this.state.value}
          save={(valor, indice) => this.props.save(valor, this.state.indice)}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({ store: state });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Visualizacao);
