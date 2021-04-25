import React from "react";
import Link from "next/link";
// components

import PagesDropdown from "components/Dropdowns/PagesDropdown.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div className="bg-white active:bg-gray-100 text-gray-800 font-normal  rounded inline-flex items-center ">
              <Link href="/">
                <a className=" text-lg font-bold leading-relaxed inline-block mr-4  whitespace-no-wrap uppercase"
                  href="#">
                  <img
                    alt="..."
                    className="h-20 mr-1 "
                    src={require("assets/img/open-letter.jpg")}
                  />
                </a>
              </Link>
              <Link href="/">
                <a className=" text-4xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap "
                  href="#">
                  OpenLetter.ai
                </a>
              </Link>
            </div>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >

            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <PagesDropdown />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
