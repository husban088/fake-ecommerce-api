import React from "react";
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

    
    
  const carts = JSON.parse(localStorage.getItem('cart')) || []


    let cartNumbers = carts.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="header text-gray-600 body-font shadow-lg">
            <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
                <Link to={'/'} className="flex cursor-pointer title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg> */}
                    <span className="ml-2 text-xl font-bold"><img src={Logo} alt="powerstore" /></span>
                </Link>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    {
                        navigations.map((navigation)=> {
                            return (
                                <Link to={navigation.path} className="mr-5 hover:text-gray-900">{navigation.name}</Link>
                            )
                        })
                    }
                </nav>
               <div className="out__sections">
               <button className='log-out-btn out__section' onClick={() => logOutHandler()}>
                {
                    localStorage.getItem("username")
                }
               </button>
               <Link to={'/cart'} className="out__section">
               <i className="fa fa-shopping-cart cursor-pointer"><sup className="cart__sup">{cartNumbers}</sup>
                    {/* <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg> */}
                </i>
               </Link>
               </div>
            </div>
        </header>
    )
}

export default Header;