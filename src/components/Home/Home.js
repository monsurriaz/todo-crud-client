import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div>
            <h2>Welcome to todo app</h2>
            <Link to="/todo"><button className="btn btn-primary">Get Started</button></Link>
        </div>
    );
};

export default Home;