import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';


import Cadastro from './cadastro/cadastro'
import Visualizacao from './visualizacao/visualizacao';

const urlBase = "http://localhost:3001/users"
const initValue = {
    user: { id: undefined, nome: undefined, cnpj: undefined, insc: undefined, latitude: undefined, longitude: undefined },
    users: [],
    url: "http://localhost:3001/users?_page=1&_limit=10",
    usersTotal: [{}],
    inicio: 1,
    fim: 10
}
class UserCrud extends Component {
    state = { ...initValue }
    componentWillMount() {
        this.updateTable(this.state.url)
        axios(urlBase).then((response) => {
            this.setState({ usersTotal: response.data });
            console.log(response)
        })
    }
    save = (valor, indice) => {
        let users = this.state.users
        let usersTotal = this.state.usersTotal
        const metodo = indice !== undefined ? 'put' : 'post'
        const url = indice !== undefined ? `${urlBase}/${valor.id}` : urlBase
        axios[metodo](url, valor).then(function (response) {
            console.log(response)
        })
        if (indice !== undefined)
            users.splice(indice, 1, valor)
        else if (this.state.users.length === 10) {
            usersTotal.push(valor)
        }
        else {
            users.push(valor)
            usersTotal.push(valor)
        }
    }
    removeUser = (item) => {
        axios['delete'](urlBase + '/' + item.id).then(function (response) {
        })
        let users = this.state.users
        users = users.filter(user => user !== item)
        let usersTotal = this.state.usersTotal
        usersTotal = usersTotal.filter(user => user !== item)
        this.setState({ users, usersTotal })
        if(this.state.users.length%10===1)
            this.pagination(this.state.inicio,this.state.fim)

    }
    pagination(inicio, fim) {
        const url = `http://localhost:3001/users?_page=${inicio}&_limit=${fim}`
        this.setState({ ...inicio, ...fim });
        this.updateTable(url)
    }
    updateTable = (url) => {
        axios(url).then((response) => {
            this.setState({ users: response.data });
        });
    }
    render() {
        return (
            <div>
                {this.props.opcao === 1 ? <Visualizacao pagination={(inicio, fim) => this.pagination(inicio, fim)} users={this.state.users} usersTotal={this.state.usersTotal}
                    colunas={['ID', 'NAME', 'CNPJ', 'INSCRIÇÃO ESTADUAL', 'LATITUDE', 'LONGITUDE']} removeUser={(item) => this.removeUser(item)} save={(valor, indice) => this.save(valor, indice)}{...this.props} t={this} /> : <Cadastro save={(valor, indice) => this.save(valor, indice)}
                        indice={this.state.usersTotal.length === 0 ? 0 : this.state.usersTotal[this.state.usersTotal.length - 1].id} label="Cadastro" />}
            </div>
        )
    }
}
export default UserCrud;
