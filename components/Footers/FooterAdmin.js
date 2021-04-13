import React from "react";

export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-4">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-gray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">

            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-center  justify-center">

                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                  >
                    About Us
                  </a>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
