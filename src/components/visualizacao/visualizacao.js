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
    return (
      <div>
        <Container>
          <Table striped bordered hover >
            <thead>
              <tr>
                {this.props.colunas.map((item, key) => <th key={key}> {item} </th>)}
              </tr>
            </thead>
            <tbody>
              {this.props.t.state.users.map((item, indice) =>
                <tr key={indice}>
                  <td>{item.id}</td>
                  <td>{item.nome}</td>
                  <td>{item.cnpj}</td>
                  <td>{item.insc}</td>
                  <td>{item.latitude}</td>
                  <td>{item.longitude}</td>
                  <td><Button variant="primary btn btn-sm" onClick={() => this.getIndice(indice)} >Primary</Button>{' '}
                    <Button variant="danger btn btn-sm" onClick={() => this.props.removeUser(item)}>Remove</Button></td>
                </tr>
              )}
            </tbody>
          </Table>
          <Pagination pagination={(inicio, fim) => this.props.pagination(inicio, fim)} usersTotal={this.props.usersTotal} {...this.props} />
          <ModalNew user={this.props.users[this.state.indice]} modal={(e) => this.modal(e)} value={this.state.value} save={(valor, indice) => this.props.save(valor, this.state.indice)} />
        </Container>
      </div >
    )
  }
}
export default (Visualizacao);
