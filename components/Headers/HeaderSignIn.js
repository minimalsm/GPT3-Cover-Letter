
import React, { useState } from "react";
import Link from 'next/link';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuth } from '../../services/auth';



export default function HeaderSignIn() {
    const [userLoggedIn, setLogin] = useState(false);
    const user = useAuth();
    firebase.auth().onAuthStateChanged(function (user) {
        setLogin(!!user);
    });
    return (
        <>
            {userLoggedIn ? (
                <li className="flex items-center">
                    <button
                        className="text-white font-bold px-4 py-2 rounded outline-none focus:outline-none  bg-orange-500 active:bg-gray-700 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                        onClick={
                            async () => {
                                await firebase.auth().signOut().then(function () {
                                    window.location.href = '/';
                                }).catch(function (error) {
                                    const message = error.message;
                                    console.log(message);
                                })
                            }}
                    >Sign Out
                            </button>
                </li>
            ) : (
                <li className="flex items-center ">
                    <Link href="/auth/login">
                        <a className="text-white font-bold px-4 py-2 rounded outline-none focus:outline-none  bg-orange-500 active:bg-gray-700 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                            href="#">
                            Sign In
                        </a>
                    </Link>
                </li>
            )}
        </>

    )
}