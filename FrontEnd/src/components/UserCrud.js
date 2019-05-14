import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';


import Cadastro from './cadastro/cadastro'
import Visualizacao from './visualizacao/visualizacao';

const quantidade = 10;
const urlBase = 'http://localhost:3001/'
const initValue = {
    user: { id: undefined, nome: undefined, cnpj: undefined, inscricaoEstadual: undefined, latitude: undefined, longitude: undefined },
    users: [],
    usersTotal: [{}],
    inicio:0,
    fim:quantidade
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
            this.pagination(0, quantidade);
            console.log(response.data.data);

        })
    }
    save = (item, indice) => {
        let users = this.state.users
        let usersTotal = this.state.usersTotal
        if (indice !== undefined) {
            axios.post(urlBase + `update`, { item })
                .then(response => {
                    this.pagination(this.state.inicio,this.state.fim)
                })
        }
        else {
            axios.post(urlBase + `insert`, { item })
                .then(response => {
                    console.log(response);
                    if (this.state.users.length === quantidade)
                        usersTotal.push(item)
                    else{
                        users.push(item)
                        usersTotal.push(item)
                    }
                })
        }
        this.setState({users:users,usersTotal:usersTotal});
    }
    removeUser = (item) => {
        axios.post(urlBase + 'delete', { item }).then(function (response) {
        })
        let users = this.state.users
        users = users.filter(user => user !== item)
        let usersTotal = this.state.usersTotal
        usersTotal = usersTotal.filter(user => user !== item)
        this.setState({ users, usersTotal })
        alert("Dado deletado com sucesso");
        if (this.state.users.length % quantidade === 1 || quantidade===1 ) {
            window.location.reload();
        }
    }
    pagination(inicio, fim) {
        console.log(inicio, fim);

        if (this.state.usersTotal.length < quantidade) {//Ate o vetor atingir o tamanho de quantidade
            fim = this.state.usersTotal.length;
            inicio = 0;
        }
        else if (fim > this.state.usersTotal.length){//Corrigir o final
            fim = this.state.usersTotal.length;
        }
        if(inicio === undefined){//Para o botão last
            let ultimaPosicao =this.state.usersTotal.length-this.state.usersTotal.length%quantidade;
            inicio = ultimaPosicao === fim ? fim-quantidade : ultimaPosicao ;
            console.log(inicio,fim);
        }
        if (this.state.usersTotal.length !== 0) {//Para não resgar valores quando for vazio
            this.setState({inicio,fim})
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
                {this.props.opcao === 1 ? <Visualizacao pagination={(inicio, fim) => this.pagination(inicio, fim)} users={this.state.users} usersTotal={this.state.usersTotal} quantidade={quantidade}
                    colunas={['ID', 'NAME', 'CNPJ', 'INSCRIÇÃO ESTADUAL', 'LATITUDE', 'LONGITUDE', '']} removeUser={(item) => this.removeUser(item)} save={(valor, indice) => this.save(valor, indice)}{...this.props} t={this} /> : <Cadastro save={(valor, indice) => this.save(valor, indice)}
                        indice={this.state.usersTotal.length === 0 ? 0 : this.state.usersTotal[this.state.usersTotal.length - 1].id} label="Cadastro" />}
            </div>
        )
    }
}
export default UserCrud;
