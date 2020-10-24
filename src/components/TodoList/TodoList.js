import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const TodoList = ({todo, deletedList, updateList}) => {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center p-2 mb-2 border">
                <span> {todo.name} </span>
                <div>
                    <Link to="/update">
                        <button onClick={() => {updateList(todo._id)}} className="mr-1">
                            <FontAwesomeIcon icon={faPen} />
                        </button>
                    </Link>
                    <button onClick={() => {deletedList(todo._id)}}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;