import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="todo-bg">
            <div className="text-center pt-5">
                <h2>Welcome to todo app</h2>
                <Link to="/todo"><button className="btn btn-primary">Get Started</button></Link>
            </div>
        </div>
    );
};

export default Home;