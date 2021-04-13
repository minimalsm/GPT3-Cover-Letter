import React, { useState } from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuth } from '../../services/auth';

import Login from './login';
import LoginNavbar from "components/Navbars/LoginNavbar.js";

import FooterSmall from "components/Footers/FooterSmall.js";


const withAuth = Component => {

    const Auth = () => {
        // Login data added to props via redux-store (or use react context for example)
        const [userLoggedIn, setLogin] = useState(false);
        const user = useAuth();

        firebase.auth().onAuthStateChanged(function (user) {
            setLogin(!!user);
        });

        // If user is not logged in, return login component
        if (!userLoggedIn) {
            return (
                <>
                    <LoginNavbar transparent />
                    <main>
                        <section className="relative w-full h-full py-40 min-h-screen">
                            <div
                                className="absolute top-0 w-full h-full bg-gray-900 bg-no-repeat bg-full"
                                style={{
                                    backgroundImage:
                                        "url(" + require("assets/img/blob2.svg") + ")",
                                }}
                            ></div>
                            <Login />
                            <FooterSmall absolute />
                        </section>
                    </main>
                </>
            );
        }

        // If user is logged in, return original component
        return (
            <>
                {/* <IndexNavbar fixed /> */}
                <Component {...Component} />
            </>
        );
    };

    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    return Auth;
};

export default withAuth;