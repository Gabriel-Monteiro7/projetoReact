import React from "react";
import { Modal } from "react-bootstrap";
import "../App.css";
import Cadastro from "../transportadora/cadastro/index";

const ModalNew = props => {
  return (
    <div>
      <Modal show={props.value} onHide={() => props.modal(false)}>
        <Modal.Header closeButton />
        <Modal.Body>
          <Cadastro
            user={props.user}
            label="Editar Cadastro"
            opcao="put"
            modal={e => props.modal(e)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default ModalNew;
