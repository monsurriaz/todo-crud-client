import React, { useContext} from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import './Login.css';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css';
import googleIcon from '../../google.png';
import Nav from '../Nav/Nav';

firebase.initializeApp(firebaseConfig);

const Login = () => {

    const {logged} = useContext(UserContext);
    const [setLoggedInUser] = logged;
    
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
            history.replace(from);
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
    // useEffect(() => {
    //     firebase.auth().onAuthStateChanged(function(user) {
    //         if (user) {
    //             const signedInUser = {
    //                 isSignedIn: true,
    //                 name: user.displayName,
    //                 email: user.email,
    //                 photo: user.photoURL
    //             }
    //             setLoggedInUser(signedInUser);
    //             history.replace(from);
    //         }
    //       });
    // }, [])

    return (
        // <div className="container-fluid pt-5 row justify-content-center">
        //     <div className="col-md-4">
        //         <div className="login shadow">
        //             <h3 className="text-center my-3">Login</h3>
        //             <button onClick={handleGoogleSignIn} className="btn"> <img className="icon" src={googleIcon} alt=""/> Containue with Google </button>
                // {/* {
                //     loggedInUser.isSignedIn ? <button onClick={handleLogOut} class="btn">Log Out</button>
                //     : <button onClick={handleGoogleSignIn} class="btn">Login</button>
                // } */}
        //         </div>
        //     </div>
        // </div>
        <section className="container-fluid">
            <Nav></Nav>
            <div className="row flex-column align-items-center">
                <div className="col-md-4 mt-3 py-5">
                    <div className="card py-5 text-center">
                        <h4 className="text-center mb-4">Login with</h4>
                        <button onClick={handleGoogleSignIn} className="g-signIn"><img src={googleIcon} alt=""/> Continue with Google </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;