import React from 'react';
import './App.css';
import Header from './components/header';
import Home from './modules/home';
import Footer from './components/footer';
import { Routes, Route } from 'react-router-dom';
import Product from './modules/product';
import Products from './modules/products';
import CategoryProducts from './modules/categoryProducts';
import Cart from './modules/cart';
import Login from './modules/login';
import AddProduct from './modules/addProduct';


function App() {

  // const [token,setToken] = useState(localStorage.getItem('userToken') ?? null);

  return (
    <div>
       <Header /> 
       <Routes>
       {/* {token ?  <Route element={<Home /> } /> : <Route element={<Login token={token} setToken={setToken} />}/> }   */}
        <Route path='/' element={<Home />}/>
        <Route path='/products/:id' element={<Product />}/>
        <Route path='/products' element={<Products />}/>
        <Route path='/categories/:name' element={<CategoryProducts />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/addproduct' element={<AddProduct />}/>
        <Route path='*' element={<div>404</div>}/>
       </Routes>
       <Footer />
    </div>
  );
}

export default App;
