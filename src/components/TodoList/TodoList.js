import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import './TodoList.css';

const TodoList = ({todo, deletedList, loadList}) => {
    return (
        <div>
            <div className="d-flex todo-name justify-content-between align-items-center p-2 mb-2 border">
                <span> {todo.name} </span>
                <div>
                    <Link to="/update">
                        <button className="delete mr-1" onClick={() => {loadList(todo._id)}}>
                            <FontAwesomeIcon icon={faPen} />
                        </button>
                    </Link>
                    <button className="delete" onClick={() => {deletedList(todo._id)}}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;