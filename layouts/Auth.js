import React from "react";

// components

import LoginNavbar from "components/Navbars/LoginNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

export default function Auth({ children }) {
  return (
    <>
      <LoginNavbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 right-0 w-full h-full bg-white-900 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/blob2.svg") + ")",
            }}
          ></div>
          {children}

          <FooterSmall absolute />

        </section>
      </main>
    </>
  );
}
