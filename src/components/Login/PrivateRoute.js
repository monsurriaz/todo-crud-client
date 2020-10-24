import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {

    const {logged} = useContext(UserContext);
    const [loggedInUser] = logged;
    
    return (
        <Route
            {...rest}
            render={({ location }) =>
            (loggedInUser.email || sessionStorage.getItem('token')) ? (
                children
            ) : (
                <Redirect
                to={{
                    pathname: "/login",
                    state: { from: location }
                }}
                />
            )
            }
        />
    );
};

export default PrivateRoute;