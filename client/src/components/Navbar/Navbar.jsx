import React, { useEffect, useState } from "react";
import './nav.css';

function Navbar() {
  const [userdata, setUserdata] = useState({});
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const userFromlocalStorage = JSON.parse(
      localStorage.getItem("quizappuser")
    );
    setUserdata(userFromlocalStorage);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // For example:
    // localStorage.removeItem("quizappuser");
    // window.location.href = "/logout"; // Redirect to logout route
  };

  return (
    <div>
      <header className="antialiased">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
              <a href="https://flowbite.com" className="flex mr-4">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  ZERO TO HERO
                </span>
              </a>
            </div>
            <div className="flex items-center lg:order-2">
              <div className="relative inline-block text-left">
                <button
                  onClick={toggleDropdown}
                  type="button"
                  className="flex mx-3 text-sm  rounded-full md:mr-0   dark:focus:ring-gray-600"
                  aria-expanded={isDropdownVisible}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="user photo"
                  />
                  <p className="ml-2 mt-1">{userdata.username}</p>
                </button>
               
                {isDropdownVisible && (
                  <div
                    id="dropdown"
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                  >
                    <div className="py-1">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400"
                        onClick={(e) => e.preventDefault()} // Prevent default behavior
                      >
                        {userdata.email}
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 "
                        onClick={(e) => e.preventDefault()} // Prevent default behavior
                      >
                        Account settings 
                      </a>
                    </div>
                    <div className="py-1">
                      <a
                        href="/dashboard" // Fixed hyperlink
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400"
                      >
                       Dashboard
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400"
                        onClick={(e) => e.preventDefault()} // Prevent default behavior
                      >
                        Collections
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400"
                        onClick={(e) => e.preventDefault()} // Prevent default behavior
                      >
                        Pro version
                      </a>
                    </div>
                    <div className="py-1">
                      <a
                        href="#"
                        className="block btn-nav px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400"
                        onClick={handleLogout} // Logout action
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
