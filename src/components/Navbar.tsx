import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="bg-rose-500 text-white w-full border-b md:border-0">
      <div className="w-fit text-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="py-3 md:py-5 md:block">
          <Link href="/">
            <h1 className="text-3xl font-bold">Blogs</h1>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
