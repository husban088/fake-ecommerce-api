import React, { useState, useEffect } from 'react';
import './addproduct.css';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const carts = JSON.parse(localStorage.getItem('cart')) || []

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: new Date().getTime(), // Use a unique ID for each product
      image,
      title,
      price
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setImage('');
    setTitle('');
    setPrice('');
    navigate('/addproduct');
  };

  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const isProductExist = cart.find(item => item.id === product.title);
    if (isProductExist) {
      const updatedCart = cart.map(item => {
        if (item.id === product.title) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      localStorage.setItem('cart', JSON.stringify([...cart, { ...product, quantity: 1 }]));
    }
    navigate('/addproduct');
  };

  const handleDecre = (id) => {
    const updatedCart = carts.map(item => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    navigate('/cart');
  };

  const handleIncre = (id) => {
    const updatedCart = carts.map(item => {
      if (item.id === id && item.quantity < 10) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    navigate('/cart');
  };

  const handleRemove = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    navigate('/addproduct');
  };

  return (
    <div className='add__prod'>
      <h2 className='add__text'>Add Product</h2>
      <form>
        <input
          type="file"
          onChange={handleImageChange}
          placeholder="Select Image"
          className='file__img'
        />
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Product Title"
            className='add__inpt'
          />
        </div>
        <div>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Product Price"
            className='add__inpt'
          />
        </div>
        <button onClick={handleAddProduct} className='btn-submit'>Add Product</button>
      </form>
      <div className='add__cont'>
        {products.map((product, index) => (
          <div key={product.id}>
            <img src={product.image} alt={product.title} className='user__img' />
            <h3>{product.title}</h3>
            <p>$ {product.price}</p>
            <button className='btn-submit' onClick={() => handleCart(product)}>Add to cart</button>
            <button onClick={() => handleRemove(product.id)} className='btn-submit'>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProduct;
