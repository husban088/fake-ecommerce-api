import React, { useState } from "react";
import './header.css';
import { Link } from "react-router-dom";
import Logo from './logo.avif';
import { useNavigate } from "react-router-dom";

const navigations = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Products',
        path: '/products'
    },
    {
        name: 'Login',
        path: '/login'
    },
    {
        name: 'AddProduct',
        path: '/addproduct'
    }
]

const Header = () => {

    const navigate = useNavigate();

    const logOutHandler = () => {
        localStorage.clear();
        navigate("/login")
        alert('logout')
      }


      const [isSidebarOpen, setIsSidebarOpen] = useState(false);

const toggleSidebar = () => {
  setIsSidebarOpen(!isSidebarOpen);
};
    
    
  const carts = JSON.parse(localStorage.getItem('cart')) || []


    let cartNumbers = carts.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="header text-gray-600 body-font shadow-lg">
        <div className=" flex flex-wrap p-3 md:flex-row">
          {/* Logo on the left side */}
          <Link
            to="/"
            className="flex cursor-pointer title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <span className="text-xl font-bold">
              <img src={Logo} alt="powerstore" />
            </span>
          </Link>
      
          {/* Cart icon on the right side in desktop view */}
          <div className="ml-auto flex items-center ">
         
      
            {/* Menu Icon for mobile view */}
            <button
              className="inline-flex items-center md:hidden text-gray-900"
              onClick={toggleSidebar}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
      
          {/* Navigation links in the center for desktop view */}
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center hidden md:flex">
            {navigations.map((navigation) => (
              <Link
                key={navigation.name}
                to={navigation.path}
                className="mr-5 hover:text-gray-900"
              >
                {navigation.name}
              </Link>
            ))}
          </nav>
      
          {/* User section (Logout button) on the right side in desktop view */}
          <div className="out__sections hidden md:flex">
            <button className="log-out-btn out__section" onClick={logOutHandler}>
              {localStorage.getItem("username")}
            </button>
            <Link to="/cart" className="out__section hidden md:flex">
              <i className="fa fa-shopping-cart cursor-pointer">
                <sup className="cart__sup">{cartNumbers}</sup>
              </i>
            </Link>
          </div>
        </div>
      
        {/* Sidebar for mobile view */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex justify-end p-4">
            <button onClick={toggleSidebar} className="text-gray-900">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <nav className="flex flex-col p-4 space-y-4">
            {navigations.map((navigation) => (
              <Link
                key={navigation.name}
                to={navigation.path}
                className="text-gray-900 hover:text-gray-700"
                onClick={toggleSidebar} // Close sidebar on link click
              >
                {navigation.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <button
              className="log-out-btn out__section w-full text-left"
              onClick={() => {
                logOutHandler();
                toggleSidebar(); // Close sidebar on logout
              }}
            >
              {localStorage.getItem("username")}
            </button>
            <Link to="/cart" className="out__section w-full text-left">
              <i className="fa fa-shopping-cart cursor-pointer">
                <sup className="cart__sup">{cartNumbers}</sup>
              </i>
            </Link>
          </div>
        </div>
      
        {/* Overlay to close sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30"
            onClick={toggleSidebar}
          ></div>
        )}
      </header>
      
  
    )
}

export default Header;