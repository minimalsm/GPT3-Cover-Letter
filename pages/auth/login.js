import React, { useState, useCallback } from "react";
import firebase from 'firebase/app';
import firebaseClient from '../../services/firebaseClient';
import 'firebase/auth';

import toast from "../../components/Toast";

import Link from "next/link";

// layout for page

import Auth from "layouts/Auth.js";

export default function Login() {

  const provider = new firebase.auth.GoogleAuthProvider();
  firebaseClient();

  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [authorizing, setAuthorizing] = useState(false);

  const handleAuth = async () => {
    setAuthorizing(true);
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      const { user, credentials } = result;
      console.log({ user, credentials });

      if (!user) {
        throw new Error('There was an issue authorizing');
      } else {
        window.location.href = '/user/dashboard';
      }
    } catch (error) {
      console.log(error.message);
    }
    setAuthorizing(false);
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-600 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  {/* <button
                    className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/github.svg")}
                    />
                    Github
                  </button> */}
                  <button
                    className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleAuth}
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/google.svg")}
                    />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-500 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox text-gray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-gray-700">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-orange-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      // isDisabled={email === '' || pass === ''}
                      onClick={
                        async () => {
                          await firebase.auth().signInWithEmailAndPassword(email, pass).then(function () {
                            window.location.href = '/user/dashboard';
                          }).catch(function (error) {
                            console.log(error.message);
                            notify("error", error.message);

                          });
                        }}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">

              <div className="w-1/2">
                <Link href="/auth/passwordreset">
                  <a
                    href="#pablo"
                    className="text-md font-semibold text-gray-700 underline"
                  >
                    <small>Forgot password?</small>
                  </a>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <p className="text-sm font-semibold text-gray-700">Don't have an account?</p>
                <Link href="/auth/register">
                  <a href="#" className="text-md font-semibold text-gray-700 underline">
                    <small>Sign up here</small>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .message {
          cursor: pointer;
          font: 15px Helvetica, Arial, sans-serif;
          background: #eee;
          padding: 20px;
          text-align: center;
          transition: 100ms ease-in background;
          margin: 10px;
        }
        .message:hover {
          background: #ccc;
        }
      `}</style>
    </>
  );
}

Login.layout = Auth;
