import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Nav = () => {
    const {logged} = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = logged;
    return (
        <nav class="navbar navbar-expand-lg navbar-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                <li class="nav-item mr-4">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li class="nav-item mr-4">
                    <Link className="nav-link" to="/todo">Todo</Link>
                </li>
                <div>
                    {
                        loggedInUser.isSignedIn && <li class="nav-item mr-4">
                        <button onClick={()=> {setLoggedInUser({})}} className="nav-link px-4 btn btn-danger text-white">Log out</button>
                    </li>
                    }
                </div>
                </ul>
            </div>
            </nav>
    );
};

export default Nav;