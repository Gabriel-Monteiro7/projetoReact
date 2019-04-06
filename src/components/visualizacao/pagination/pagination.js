
import React, {  } from 'react';
import '../../../App.css';

const Pagination = (props) => {


    return (
            <div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                        <li className="page-item">
                            <button className="page-link" onClick={(inicio, fim) => props.pagination(1, 10)} >First</button>
                        </li>
                        {props.usersTotal.filter((user, indice) => indice % 10 === 0).map((user, indice) => <li className="page-item" key={indice}><button className="page-link" onClick={() => props.pagination((indice + 1), 10)}>{(indice + 1)}</button></li>)}
                        <li className="page-item">
                            <button className="page-link" onClick={(inicio, fim) => props.pagination(Math.round(props.usersTotal.length / 10), 10)} >Last</button>
                        </li>
                    </ul>
                </nav>
            </div>
    )
}
export default (Pagination);


