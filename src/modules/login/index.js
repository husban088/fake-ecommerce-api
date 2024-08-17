
import React, { useState } from "react";
import axios from "axios";
import './login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([])
  const navigate = useNavigate();

  const loginSec = document.querySelector(".login")

  const loginHandler = () => {
    setError("");
    setPassword("");
    setUsername("");
    axios({
      url: "https://fakestoreapi.com/auth/login",
      method: "POST",
      data: {
        username: userName,
        password: password,
      },
    })
      .then(res => {
        console.log(res.data);
        setData(res.data);
        localStorage.setItem('userToken', res.data);
        localStorage.setItem('username', userName);

        if (res.data) {
          navigate("/")
          alert("Login Success")
          loginSec.style.display = "none";
        } else {
          alert('alreay exist')
        }

      })
      .catch(err => {
        console.log(err.response);
        setError(err.response.data)
      });

  };

  return (
    <div className="login">
      <h1 className="login__text">Customer login</h1>

      <div className="login-inputs">
        <input value={userName} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" className="inpt__text" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="inpt__text" />
        <div style={{ marginBottom: "2rem" }}>
          {error && <small>{error}</small>}
        </div>
        <button type="submit" onClick={loginHandler}
          className="log__btn">Login</button>
      </div>
    </div>
  )
}

export default Login;