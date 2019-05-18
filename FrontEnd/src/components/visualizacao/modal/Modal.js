import React from 'react';
import { Modal } from 'react-bootstrap';

import '../../../App.css';

import Cadastro from '../../cadastro/cadastro';

const ModalNew = (props) => {

    return (
        <div>
            <Modal show={props.value} onHide={() => props.modal(false)} >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Cadastro user={props.user} label="Editar Cadastro" opcao='put' save={(valor, indice) => props.save(valor, indice)} modal={(e) => props.modal(e)} />
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default (ModalNew);
