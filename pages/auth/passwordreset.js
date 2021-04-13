import React, { useState, useCallback } from "react";
import firebase from 'firebase/app';
import firebaseClient from '../../services/firebaseClient';
import 'firebase/auth';

import toast from "../../components/Toast";

import Link from "next/link";

// layout for page

import Auth from "layouts/Auth.js";

export default function PassReset() {

    firebaseClient();

    const [email, setEmail] = useState('');
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);

    const notify = useCallback((type, message) => {
        toast({ type, message });
    }, []);




    return (
        <>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                    <h4 className="text-gray-600 text-sm font-bold">
                                        Reset Password
                                    </h4>
                                </div>

                                <hr className="mt-6 border-b-1 border-gray-400" />
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                                <form>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >Email</label>
                                        <input
                                            type="email"
                                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>


                                    <div className="text-center mt-6">
                                        <button
                                            className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type="button"

                                            onClick={
                                                async () => {
                                                    await firebase
                                                        .auth()
                                                        .sendPasswordResetEmail(email)
                                                        .then(() => {
                                                            notify('success', "Password Reset Sent!");
                                                            setTimeout(() => { window.location.href = '/auth/login' }, 5000);
                                                        })
                                                        .catch((error) => {
                                                            notify('error', error.message);
                                                        });
                                                }}
                                        >
                                            Send Password Reset Email
                    </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6 relative">
                            <div className="w-1/2">

                            </div>
                            <div className="w-1/2 text-right">
                                <p className="text-gray-300">Don't have an account?</p>
                                <Link href="/auth/register">
                                    <a href="#pablo" className="text-gray-300 underline">
                                        <small>Sign up here</small>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

PassReset.layout = Auth;
