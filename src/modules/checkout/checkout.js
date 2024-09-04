// src/CheckoutPage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './cart.css';


const CheckoutPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        phone: '',
      });
      const [isPopupVisible, setPopupVisible] = useState(false);
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const isFormComplete = Object.values(formData).every((value) => value.trim() !== '');
    
      const handleOrder = () => {
        if (isFormComplete) {
          setPopupVisible(true);
          navigate('/checkout');
          localStorage.clear();
          localStorage.removeItem('cart');
          // Reset the form data
          setFormData({
            name: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            email: '',
            phone: '',
          });
        }
      };
    
      const closePopup = () => {
        setPopupVisible(false);
      };

  const [total, setTotal] = useState(0)

  const carts = JSON.parse(localStorage.getItem('cart')) || []
  const navigate = useNavigate();

  // let cartNumbers = carts.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const total = carts.reduce((acc, item) => {
      return acc + (item.price * item.quantity)
    }, 0)
    setTotal(total)

  }, [carts])



  // const cartsa = JSON.parse(localStorage.getItem('cart')) || []





  const handleDecre = (id) => {
    const updatedCart = carts.map(item => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/checkout')
  }

  const handleIncre = (id) => {
    const updatedCart = carts.map(item => {
      if (item.id === id && item.quantity < 10) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/checkout')
  }

  const handleRemove = (id) => {
    const updatedCart = carts.filter(item => item.id !== id)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/checkout')
  }

  return (
    <>
    
    <div className="cart relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

{/* <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div> */}

<div className="overflow-hidden">
  <div className="inset-0 overflow-hidden">
    <div className="pointer-events-none inset-y-0 flex pl-10">

      <div className="cart__sec pointer-events-auto w-screen max-w-xl w-900">
        <div className="flex h-full flex-col overflow-y-hidden bg-white shadow-xl">
          <div className="flex-1 overflow-y-hidden px-5 py-6 sm:px-6" id="cart__cart">
            <div className="cart__head flex items-start justify-between">
              <h2 className="shop__text text-lg font-medium" id="slide-over-title">Product</h2>
              <div className="ml-3 flex h-7 items-center">
                {/* <button type="button" class="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                    <span class="absolute -inset-0.5"></span>
                    <span class="sr-only">Close panel</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button> */}
                <p className="item__text text-lg font-bold">Price</p>
              </div>
            </div>

            {
              carts?.map(cart => {
                return (
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200">
                        <li className="flex py-6 justify-center items-left">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img src={cart?.image} alt={cart?.title} className="h-full w-full object-contain object-center" />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href="to">{cart?.title}</a>
                                </h3>
                                <p className="ml-4 cart__price cart__prices">$ {cart?.price}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500 cart__cate">{cart?.category}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="quan__box">
                                <span className="decre__btn"><i className="fa fa-minus" onClick={() => handleDecre(cart?.id)}></i></span>
                                <p className="text-gray-500">{cart?.quantity}</p>
                                <span className="incre__btn"><i className="fa fa-plus" onClick={() => handleIncre(cart?.id)}></i></span>
                              </div>



                              <div className="flex">
                                <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500 cart__remv cart__remvs" onClick={() => handleRemove(cart?.id)}>Remove</button>
                              </div>

                            </div>
                          </div>
                        </li>


                      </ul>
                    </div>

                  </div>
                )
              })
            }


          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${total}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to={'/products'} className="font-medium text-indigo-600 hover:text-indigo-500">
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
</div>





<div className="min-h-screen flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-1">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">ZIP Code</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="button"
            onClick={handleOrder}
            disabled={!isFormComplete}
            className={`w-full p-2 mt-4 ${isFormComplete ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'} text-white rounded-lg`}
          >
            Place Order
          </button>
        </form>
      </div>

      {isPopupVisible && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
          onClick={closePopup}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold">Your order has been placed!</h3>
            <button
              onClick={closePopup}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
     
    </>
  );
};

export default CheckoutPage;