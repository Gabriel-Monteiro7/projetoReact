
import React, {  } from 'react';
import '../../../App.css';

const quantidade = 2;
const Pagination = (props) => {


    return (
            <div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                        <li className="page-item">
                            <button className="page-link" onClick={(inicio, fim) => props.pagination(0, quantidade)} >First</button>
                        </li>
                        {props.usersTotal.filter((user, indice) => indice % quantidade === 0).map((user, indice) => <li className="page-item" key={indice}><button className="page-link" onClick={() => props.pagination(((indice+1)*quantidade)-quantidade,(indice+1)*quantidade)}>{(indice+1)}</button></li>)}
                        <li className="page-item">
                            <button className="page-link" onClick={(inicio, fim) => props.pagination(Math.round(props.usersTotal.length / quantidade)*quantidade-quantidade, props.usersTotal.length)} >Last</button>
                        </li>
                    </ul>
                </nav>
            </div>
    )
}
export default (Pagination);


