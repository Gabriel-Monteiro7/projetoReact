
import React, {  } from 'react';
import '../../../App.css';

const Pagination = (props) => {
    return (
            <div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                        <li className="page-item">
                            <button className="page-link" onClick={(inicio, fim) => props.pagination(0, props.quantidade)} >First</button>
                        </li>
                        {props.usersTotal.filter((user, indice) => indice % props.quantidade === 0).map((user, indice) => <li className="page-item" key={indice}><button className="page-link" onClick={(inicio, fim) => props.pagination(((indice+1)*props.quantidade)-props.quantidade,(indice+1)*props.quantidade)}>{(indice+1)}</button></li>)}
                        <li className="page-item">
                            <button className="page-link" onClick={(inicio, fim) => props.pagination(undefined, props.usersTotal.length)} >Last</button>
                        </li>
                    </ul>
                </nav>
            </div>
    )
}
export default (Pagination);


