import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import VMasker from "vanilla-masker";
import * as Actions from "../../actions/todos";
import "../../App.css";
import { insertUser, updateUser } from "../../utils/request";

class Cadastro extends Component {
  state = {
    user:
      this.props.label !== "Cadastro"
        ? this.props.store.data.value
        : {
            id: this.props.store.data.indice,
            nome: "",
            cnpj: "",
            inscricaoEstadual: "",
            latitude: "",
            longitude: ""
          }
  };
  updateValue = (valor, e) => {
    const { user } = this.state;
    user[e.target.name] = e.target.value;
    if (valor === 1) {
      user.cnpj = VMasker.toPattern(user.cnpj, "99.999.999/9999-99");
    } else if (valor === 2)
      user.inscricaoEstadual = VMasker.toPattern(
        user.inscricaoEstadual,
        "999.999.999"
      );
    else if (valor === 3) {
      let aux = parseFloat(user.latitude);
      if (aux < 0)
        user.latitude = VMasker.toPattern(user.latitude, "-99.9999999");
      else user.latitude = VMasker.toPattern(user.latitude, "99.9999999");
    } else if (valor === 4) {
      let aux = parseFloat(user.longitude);
      if (aux < 0)
        user.longitude = VMasker.toPattern(user.longitude, "-99.9999999");
      else user.longitude = VMasker.toPattern(user.longitude, "99.9999999");
    }
    this.setState({ user });
  };
  addUser = event => {
    let item = this.state.user;
    if (item.id !== this.props.store.data.indice) {
      updateUser(item).then(response => {});
    } else {
      insertUser(item).then(response => {});
      this.props.addUser(item);
    }
    event.preventDefault();
    alert("Dados salvos com sucesso!");
    this.setState({
      user: {
        id: this.props.store.data.indice + 1,
        nome: "",
        cnpj: "",
        inscricaoEstadual: "",
        latitude: "",
        longitude: ""
      }
    });
    if (this.props.label === "Editar Cadastro") this.props.modal(false);
  };
  render() {
    return (
      <div>
        <div className="centralizar">
          <h2>{this.props.label}</h2>
          <form onSubmit={event => this.addUser(event)}>
            <div className="row">
              <div className="form-group col-sm-12">
                Nome
                <input
                  required
                  type="text"
                  className="form-control"
                  pattern="[a-zA-Z ' ']+"
                  name="nome"
                  value={this.state.user.nome}
                  onChange={e => this.updateValue(0, e)}
                />
              </div>
              <div className="form-group col-sm-12">
                CNPJ
                <input
                  type="text"
                  className="form-control"
                  placeholder="99.999.999/9999-99"
                  required
                  name="cnpj"
                  value={this.state.user.cnpj}
                  onChange={e => this.updateValue(1, e)}
                  max="18"
                  min="18"
                />
              </div>
              <div className="form-group col-sm-12">
                Inscrição Estadual
                <input
                  type="text"
                  className="form-control"
                  placeholder="999.999.999"
                  maxLength="11"
                  minLength="1"
                  required
                  name="inscricaoEstadual"
                  value={this.state.user.inscricaoEstadual}
                  onChange={e => this.updateValue(2, e)}
                />
              </div>
              <div className="form-group col-sm-6">
                Latitude
                <input
                  type="text"
                  className="form-control"
                  placeholder="99.9999999"
                  maxLength="11"
                  minLength="1"
                  required
                  name="latitude"
                  value={this.state.user.latitude}
                  onChange={e => this.updateValue(3, e)}
                />
              </div>
              <div className="form-group col-sm-6">
                Longitude
                <input
                  type="text"
                  className="form-control"
                  placeholder="99.9999999"
                  maxLength="11"
                  minLength="1"
                  required
                  name="longitude"
                  value={this.state.user.longitude}
                  onChange={e => this.updateValue(4, e)}
                />
              </div>
            </div>
            <button className="btn btn-dark">Salvar</button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({ store: state });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cadastro);
