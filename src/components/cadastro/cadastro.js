import React, {Component } from 'react';
import '../../App.css';

const VMasker = require('vanilla-masker');
class Cadastro extends Component {
    constructor(props){
        super(props)
        this.state = {
            indice: this.props.indice+1,
            user : this.props.user || { id: this.props.indice+1, nome: '', cnpj: '', insc: '', latitude: '', longitude:'',},
        }
    }
    updateValue = (valor,e) =>{
        const user = { ...this.state.user };
        user[e.target.name] = e.target.value;
        if(valor===1){
          user.cnpj = VMasker.toPattern(user.cnpj, "99.999.999/9999-99");
        }
        else if(valor === 2) 
        user.insc = VMasker.toPattern(user.insc, "999.999.999");
        else if(valor === 3){
          let aux = parseFloat(user.latitude)
          if(aux<0)
          user.latitude = VMasker.toPattern(user.latitude, "-99.9999999");
          else
          user.latitude = VMasker.toPattern(user.latitude, "99.9999999");
        }
        else if (valor === 4){
          let aux = parseFloat(user.longitude)
          if(aux<0)
          user.longitude = VMasker.toPattern(user.longitude, "-99.9999999");
          else
          user.longitude = VMasker.toPattern(user.longitude, "99.9999999");
        }
        this.setState({ user });
       }
       addUser = (event) =>{
        
        this.props.save(this.state.user);
        event.preventDefault();
        this.setState({
            user : { id:this.state.user.id+1 , nome: '', cnpj: '', insc: '', latitude: '', longitude:''}
        });
        alert("Dados salvos com sucesso!");
        
        if(this.props.label==="Editar Cadastro")
            this.props.modal(false);
       }
    render() {
        console.log(this.props.indice)
        return (
            <div>
                <div className="centralizar">
                    <h2>{this.props.label}</h2>
                    <form onSubmit ={(event) => this.addUser(event) }>
                        <div className="row">
                            <div className="form-group col-sm-12" >
                                Nome
              <input required type="text" className="form-control" pattern="[a-zA-Z ' ']+" name="nome" value={this.state.user.nome} onChange={(e) => this.updateValue(0,e)} />
                            </div>
                            <div className="form-group col-sm-12">
                                CNPJ
              <input type="text" className="form-control" placeholder="99.999.999/9999-99" required name="cnpj"  value={this.state.user.cnpj} onChange={(e) => this.updateValue(1,e)} />
                            </div>
                            <div className="form-group col-sm-12">
                                Inscrição Estadual
              <input type="text" className="form-control" placeholder="999.999.999" required name="insc"  value={this.state.user.insc} onChange={(e) => this.updateValue(2,e)}/>
                            </div>
                            <div className="form-group col-sm-6">
                                Latitude
              <input type="text" className="form-control" placeholder="99.9999999" required
                                    name="latitude"  value={this.state.user.latitude} onChange={(e) => this.updateValue(3,e)}/>
                            </div>
                            <div className="form-group col-sm-6">
                                Longitude
              <input type="text" className="form-control" placeholder="99.9999999" required
                                    name="longitude"  value={this.state.user.longitude} onChange={(e) => this.updateValue(4,e)}/>
                            </div>
                        </div>
                        <button className="btn btn-dark" >Salvar</button>
                    </form>
                    
                </div >
            </div >
        );
    }
}
export default (Cadastro);
