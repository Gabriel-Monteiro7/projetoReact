import React, { Component } from 'react';
import '../../App.css';
import { Table, Container, Button } from 'react-bootstrap'

import Pagination from './pagination/pagination'
import ModalNew from './modal/Modal'

class Visualizacao extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: false,
      indice: 0
    }
  }
  getIndice = (indice) => {
    this.setState({ indice: indice })
    this.modal(true)
  }
  modal = (value, indice) => {
    this.setState({ value: value })
  }
  render() {
    let { users } = this.props
    return (
      <div className="container">
        <Table striped bordered hover responsive> 
          <thead>
            <tr>
              {this.props.colunas.map((item, key) => <th key={key}> {item} </th>)}
            </tr>
          </thead>
          <tbody>
            {users.map((item, indice) =>
              <tr key={indice}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.cnpj}</td>
                <td>{item.inscricaoEstadual}</td>
                <td>{item.latitude}</td>
                <td>{item.longitude}</td>
                <td><Button variant="btn btn-outline-primary btn-sm" onClick={() => this.getIndice(indice)} >Update</Button>{' '}
                  <Button variant="btn btn-outline-danger btn-sm" onClick={() => this.props.removeUser(item)}>Delete</Button></td>
              </tr>
            )}
          </tbody>
        </Table>
        <Pagination pagination={(inicio, fim) => this.props.pagination(inicio, fim)} allUsers={this.props.allUsers} {...this.props} />
        <ModalNew user={users[this.state.indice]} modal={(e) => this.modal(e)} value={this.state.value} save={(valor, indice) => this.props.save(valor, this.state.indice)} />
      </div >
    )
  }
}
export default (Visualizacao);
