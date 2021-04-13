import React, { useState } from "react";
import Link from 'next/link';

import firebase from 'firebase/app';

import 'firebase/auth';
import { useAuth } from '../../services/auth';



export default function HeaderNav() {
    const [userLoggedIn, setLogin] = useState(false);
    const user = useAuth();

    firebase.auth().onAuthStateChanged(function (user) {
        setLogin(!!user);
    });


    return (
        <>


            {userLoggedIn ? (<li className="flex items-center">
                <Link href="/user/dashboard">
                    <a href='#' className={
                        "font-bold px-4 py-2 rounded outline-none focus:outline-none  active:bg-gray-700 uppercase text-sm hover:shadow-lg ease-linear transition-all duration-150"
                    }>
                        Dashboard
                </a>
                </Link>
            </li>) : (
                <li className="flex items-center">
                    <Link href="/pricing">
                        <a href='#' className={
                            "font-bold px-4 py-2 rounded outline-none focus:outline-none  active:bg-gray-700 uppercase text-sm hover:shadow-lg ease-linear transition-all duration-150"
                        }>
                            Pricing
                    </a>
                    </Link >
                </li >)
            }

            <li className="flex items-center">

                <Link href="/contact">
                    <a href='#' className={
                        "font-bold px-4 py-2 rounded outline-none focus:outline-none  active:bg-gray-700 uppercase text-sm hover:shadow-lg ease-linear transition-all duration-150"}>
                        Contact
                </a>
                </Link>
            </li>

        </>

    )
}