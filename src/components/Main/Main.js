import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import TodoList from '../TodoList/TodoList';
import Updates from '../Updates/Updates';
import './Main.css';

const Main = () => {
    const [todos, setTodos] = useState([]);
    const {updates} = useContext(UserContext);
    const [update, setUpdates] = updates;
    console.log(update);

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        fetch('http://localhost:5000/addTodo', {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(data),
        })
        if(data){
            document.getElementById('form-name').value = '';
        }
    };

    useEffect(() => {
        fetch('http://localhost:5000/showTodo')
        .then(res => res.json())
        .then(data => {
            setTodos(data);
        })
        .catch(error => console.log(error))
    }, [todos]);


    const deletedList = (id) => {
        fetch(`http://localhost:5000/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            console.log('deleted successfully')
        });
    }

    const LoadList = (id) => {
        fetch(`http://localhost:5000/todolist/${id}`)
        .then(res => res.json())
        .then(result => setUpdates(result));
    }


    
    return (
        <section className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-12 col-md-4">
                <h2>Todo App here</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="form pt-5 mb-3">
                        <div className="input-group">
                            <input id="form-name" name="name" className="form-control" placeholder="write something.."  ref={register({ required: true })} />
                                {errors.name && <span>This field is required</span>}
                            <div className="input-group-append">
                                <input type="submit" value="Add Todo" className="btn btn-primary" />
                            </div>
                        </div>
                    </form>
                    {
                        todos.map(todo => <TodoList 
                            key={todo._id}
                            todo={todo}
                            deletedList={deletedList}
                            updateList={LoadList}
                        >

                        </TodoList> )
                    }
                </div>
            </div>
        </section>
    );
};

export default Main;