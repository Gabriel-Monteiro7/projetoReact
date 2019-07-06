import React from "react";
import "../App.css";

const Pagination = props => {
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li className="page-item">
            <button
              className="page-link"
              onClick={(inicio, fim) => props.pagination(0, props.quantity)}
            >
              First
            </button>
          </li>
          {props.allUsers
            .filter((user, indice) => indice % props.quantity === 0)
            .map((user, indice) => (
              <li className="page-item" key={indice}>
                <button
                  className="page-link"
                  onClick={(inicio, fim) =>
                    props.pagination(
                      (indice + 1) * props.quantity - props.quantity,
                      (indice + 1) * props.quantity
                    )
                  }
                >
                  {indice + 1}
                </button>
              </li>
            ))}
          <li className="page-item">
            <button
              className="page-link"
              onClick={(inicio, fim) =>
                props.pagination(undefined, props.allUsers.length)
              }
            >
              Last
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Pagination;
