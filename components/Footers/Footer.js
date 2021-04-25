import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="relative bg-gray-300 pt-8 pb-6">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-center">
            <div className="w-full px-4">
              <h4 className="text-3xl font-semibold">I'd love to hear from you!</h4>
              <h5 className="text-lg mt-0 mb-2 text-gray-700">
                Follow me on twitter to see me build this in public. Lets make Open Letter the best it can be together 🤝😄
              </h5>
              <div className="mt-6 lg:mb-0 mb-6">
                <a href="https://www.twitter.com/NateSpring_" target="_blank">
                  <button
                    className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                  >
                    <i className="fab fa-twitter"></i>
                  </button></a>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-400" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-gray-600 font-semibold py-1">
                Copyright © {new Date().getFullYear()} Created by{" "}
                <a
                  href=""
                  className="text-gray-600 hover:text-gray-900"
                >
                  Nate Spring
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
