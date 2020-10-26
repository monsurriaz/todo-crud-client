import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import Nav from '../Nav/Nav';
import TodoList from '../TodoList/TodoList';
import './Main.css';

const Main = () => {
    const [todos, setTodos] = useState([]);
    const {updates, logged} = useContext(UserContext);
    const [setUpdates] = updates;
    const [loggedInUser] = logged;
    

    const { register, handleSubmit, errors } = useForm();

    //create
    const onSubmit = data => {
        fetch('https://fierce-brushlands-90552.herokuapp.com/addTodo', {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(data),
        })
        if(data){
            document.getElementById('form-name').value = '';
        }
    };

    //read
    useEffect(() => {
        fetch('https://fierce-brushlands-90552.herokuapp.com/showTodo?email='+loggedInUser.email)
        .then(res => res.json())
        .then(data => {
            setTodos(data);
        })
        .catch(error => console.log(error))
    }, [todos]);


    //delete 
    const deletedList = (id) => {
        fetch(`https://fierce-brushlands-90552.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            console.log('deleted successfully')
        });
    }

    //single list load
    const LoadList = (id) => {
        fetch(`https://fierce-brushlands-90552.herokuapp.com/todolist/${id}`)
        .then(res => res.json())
        .then(result => setUpdates(result));
    }

    
    return (
        <section className="container-fluid todo-bg">
            <Nav></Nav>
            <div className="row pt-3 justify-content-center">
                <div className="col-12 todo col-md-4">
                <h2 className="text-center text-white">Todo App</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="form pt-3 mb-3">
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
                            loadList={LoadList}
                        >

                        </TodoList> )
                    }
                </div>
            </div>
        </section>
    );
};

export default Main;