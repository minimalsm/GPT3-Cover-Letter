import React, { useState, useEffect, useContext, createContext } from 'react';

import nookies from 'nookies';
import firebaseClient from './firebaseClient';
import firebase from 'firebase/app';
import 'firebase/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    firebaseClient();
    const [user, setUser] = useState(null);

    useEffect(() => {
        return firebase.auth().onIdTokenChanged(async (user) => {
            if (!user) {
                setUser(null);
                nookies.destroy(null, 'token');
                nookies.set(undefined, 'token', '', { path: '/' });
                console.log('Token changed, not logged in')
                return;
            }
            const token = await user.getIdToken();
            setUser(user);
            nookies.destroy(null, 'token');
            nookies.set(undefined, 'token', token, { path: '/' });
        })
    }, []);


    // // Forcing refresh of saved token every 10 mins
    useEffect(() => {
        const handle = setInterval(async () => {
            const user = firebase.auth().currentUser;
            if (user) await user.getIdToken(true);
            console.log("Refreshing Token at: " + Date.now());

        }, 9 * 60 * 1000);


        // clean up setInterval
        return () => clearInterval(handle);
    }, []);
    // 

    return (<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>);
};

export const useAuth = () => useContext(AuthContext);
export default useAuth;