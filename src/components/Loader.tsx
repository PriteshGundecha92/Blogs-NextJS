import React from "react";

function Loader() {
  return (
    <div className="text-right rtl:text-left fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
      <div className="flex flex-col">
        <div className="flex flex-row space-x-16">
          <div className="flex">
            <div className="relative">
              <div
                className="w-12 h-12 rounded-full absolute
                            border-2 border-solid border-gray-200"
              ></div>

              <div
                className="w-12 h-12 rounded-full animate-spin absolute
                            border-2 border-solid border-blue-500 border-t-transparent shadow-md"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
