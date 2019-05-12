import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';


import Cadastro from './cadastro/cadastro'
import Visualizacao from './visualizacao/visualizacao';

const urlBase = 'http://localhost:3001/'
const initValue = {
    user: { id: undefined, nome: undefined, cnpj: undefined, inscricaoEstadual: undefined, latitude: undefined, longitude: undefined },
    users: [],
    usersTotal: [{}],
    inicio: 0,
    fim: 2
}
class UserCrud extends Component {
    state = { ...initValue }
    componentWillMount() {
        // this.updateTable(this.state.url)
        // axios(urlBase).then((response) => {
        //     this.setState({ usersTotal: response.data });
        //     console.log(response)
        // })
        axios.get(urlBase + `selectAll`).then(response => {
            this.setState({ usersTotal: response.data.data.sort((a, b) => a.id - b.id) });


            this.pagination(this.state.inicio, this.state.fim);
        })


    }
    save = (item, indice) => {
        let users = this.state.users
        let usersTotal = this.state.usersTotal
        if (indice !== undefined) {
            axios.post(urlBase + `update`, { item })
                .then(response => {
                    console.log(response);
                })
        }
        else {
            axios.post(urlBase + `insert`, { item })
                .then(response => {
                    console.log(response);

                })
        }

        if (indice !== undefined)
            users.splice(indice, 1, item)
        else if (this.state.users.length === 2) {
            usersTotal.push(item)
        }
        else {
            users.push(item)
            usersTotal.push(item)
        }
    }
    removeUser = (item) => {
        axios.post(urlBase + 'delete', { item }).then(function (response) {
        })
        let users = this.state.users
        users = users.filter(user => user !== item)
        let usersTotal = this.state.usersTotal
        usersTotal = usersTotal.filter(user => user !== item)
        this.setState({ users, usersTotal })
        if (this.state.users.length % 2 === 1) {
            alert("Dado deletado com sucesso");
            window.location.reload();
        }


    }
    pagination(inicio, fim) {
        if (this.state.usersTotal.length !== 0) {
            if (this.state.usersTotal.length === fim - 1) {
                if (this.state.usersTotal.length % 2 !== 0)
                    fim -= 1;
            }
            const url = urlBase + `select?inicio=${this.state.usersTotal[inicio].id}&fim=${(this.state.usersTotal[fim - 1].id)}`
            this.updateTable(url)
        }

    }
    updateTable = (url) => {
        axios(url).then((response) => {
            this.setState({ users: response.data.data.sort((a, b) => a.id - b.id) });
        });


    }
    render() {
        return (
            <div>
                {this.props.opcao === 1 ? <Visualizacao pagination={(inicio, fim) => this.pagination(inicio, fim)} users={this.state.users} usersTotal={this.state.usersTotal}
                    colunas={['ID', 'NAME', 'CNPJ', 'INSCRIÇÃO ESTADUAL', 'LATITUDE', 'LONGITUDE', '']} removeUser={(item) => this.removeUser(item)} save={(valor, indice) => this.save(valor, indice)}{...this.props} t={this} /> : <Cadastro save={(valor, indice) => this.save(valor, indice)}
                        indice={this.state.usersTotal.length === 0 ? 0 : this.state.usersTotal[this.state.usersTotal.length - 1].id} label="Cadastro" />}
            </div>
        )
    }
}
export default UserCrud;
