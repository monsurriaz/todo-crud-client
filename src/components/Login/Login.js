import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import './Login.css';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const Login = () => {

    const {logged} = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = logged;

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(res => {
            const {displayName, email, photoURL} = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            setLoggedInUser(signedInUser);
            handleStoreToken();
        })
        .catch(err => console.log(err))
    }

    const handleLogOut = () => {
        firebase.auth().signOut()
        .then(res => {
            const signedInUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: ''
            }
            setLoggedInUser(signedInUser);
        })
    }

    const handleStoreToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(idToken => {
            sessionStorage.setItem('token', idToken);
            history.replace(from);
          }).catch(error => {
            console.log(error);
          });
    }

    return (
        <div>
            {
                loggedInUser.isSignedIn ? <button onClick={handleLogOut} class="btn">Log Out</button>
                : <button onClick={handleGoogleSignIn} class="btn">Login</button>
            }
            
        </div>
    );
};

export default Login;