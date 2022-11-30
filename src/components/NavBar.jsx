/* eslint-disable array-callback-return */
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import disableScroll from "disable-scroll";
import logo from "../img/logo.png";
import cart from "../img/cart.svg";
import userLogin from "../img/userlogin.svg";
import logoutIcon from "../img/logout.svg";
import Login from "./Login";
import "./navbar.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { CartContext } from "../context/cartContext";
import ItemCart from "./ItemCart";
AOS.init();

export default function NavBar() {
  const [productsLength, setProductsLength] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems } = useContext(CartContext);
  const [estadoModal, setEstadoModal] = useState(false);

  useEffect(() => {
    setProductsLength(
      cartItems.reduce(
        (previous, current) => previous + current.amountOnCart,
        0
      )
    );
  }, [cartItems]);

  const total = cartItems.reduce(
    (previous, current) => previous + current.amountOnCart * current.price,
    0
  );

  return (
    <div className="barra">
      <nav className="nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? "" : "")}>
          <img className="logo" src={logo} alt="" />
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "nav__link")}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "nav__link")}
          to="/shop"
        >
          Shop
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "nav__link")}
          to="/about-us"
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "nav__link")}
          to="/contact"
        >
          Contact us
        </NavLink>
      </nav>
      <div className="icon-container">
        <div
          className="cartItems"
          onMouseEnter={() => setCartOpen(true)}
          onMouseLeave={() => setCartOpen(false)}
        >
          <img src={cart} alt="" className="cart" onClick={()=> navigate('/cart')} />
          <div className="cartLength">{productsLength}</div>
          {cartOpen && (
            <CartItemsHover
              onMouseLeave={() => setCartOpen(false)}
            >
              <h2>Tu carrito</h2>
              <CartItemsMap>
                {cartItems.length === 0 ? (
                  <p className='cartVoid'>Tu carrito esta vacio</p>
                ) : (
                  cartItems.map((item, i) => (
                    <ItemCart key={item.id} item={item} />
                  ))
                )}
              </CartItemsMap>
              <h2>Total: ${total}</h2>
            </CartItemsHover>
          )}
        </div>

        {user ? (
          <img
            src={userLogin}
            alt=""
            onClick={() => {
              navigate("/profile");
            }}
            className="menu"
          />
        ) : (
          <img
            src={userLogin}
            alt=""
            onClick={() => {
              setEstadoModal(!estadoModal);
              disableScroll.on();
            }}
            className="menu"
          />
        )}
        <Login estado={estadoModal} cambiarEstado={setEstadoModal} />
      </div>
    </div>
  );
}

const CartItemsHover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px; 
  position: absolute;
  right: 5px;
  top: 90%;
  background-color: #1f1f1f;
  cursor: auto;
  h2{
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    padding: 20px 0;
    :last-child{
      padding: 10px 0 20px;
    }
  }
  .cartVoid{
    text-align: center;
    padding-bottom: 10px;
    color: #fff;
    font-size: 14px;
  }
`;

const CartItemsMap = styled.div`
 width: 310px;
 max-height: 200px;
 overflow-y: scroll;
 ::-webkit-scrollbar{
  -webkit-appearance: none;
}
::-webkit-scrollbar:vertical{
  width: 3px;
}
::-webkit-scrollbar-thumb{
  background-color: rgb(175, 175, 175);
  border-radius: 20px;
}
`;
