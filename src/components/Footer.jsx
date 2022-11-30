import React from 'react';
import { NavLink } from 'react-router-dom';
import style from 'styled-components'
import Logo from '../img/Logopng.png'
import face from '../img/facebookwhite.svg'
import inst from '../img/instawhite.svg'
import twit from '../img/twitwhite.svg'
import './footer.css'

export default function Footer() {
  return (
    <>
      <FooterMain>
          <ContenedorLogo>
            <img src={Logo} alt="" />
          </ContenedorLogo>
          <NavFooter>
            <NavLink to='/' className={({ isActive }) => isActive ? 'activeFooter' : 'nav__link--footer'}>Home</NavLink>
            <NavLink to='/shop' className={({ isActive }) => isActive ? 'activeFooter' : 'nav__link--footer'}>Shop</NavLink>
            <NavLink to='/blog' className={({ isActive }) => isActive ? 'activeFooter' : 'nav__link--footer'}>Blog</NavLink>
            <NavLink to='/media' className={({ isActive }) => isActive ? 'activeFooter' : 'nav__link--footer'}>Media</NavLink>
            <NavLink to='/contact' className={({ isActive }) => isActive ? 'activeFooter' : 'nav__link--footer'}>Contact us</NavLink>
          </NavFooter>
          <ContenedorRedes>
            <a href="https://twitter.com/" target='_blank' rel="noreferrer"><img src={twit} alt="" /></a>
            <a href='https://www.instagram.com/alindesignstore/' target='_blank' rel="noreferrer"><img src={inst} alt="" /></a>
            <a href='https://www.facebook.com/' target='_blank' rel="noreferrer"><img src={face} alt="" /></a>
          </ContenedorRedes>
          <h4>Todos los derechos reservados. AlinDesign. 2022 ©</h4>
      </FooterMain>
    </>)
    ;
}
const FooterMain = style.footer`
background-color: #000;
height: 250px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin: 0 auto;
align-items: center;
h4{
 color: #fff;
 text-align: center;
 font-size: 13px;
 padding: 10px 0 0;
}
`;

const ContenedorLogo = style.div`
display: flex;
justify-content: center;
width: 100%;
margin-bottom: 10px;
  img{
   width: 80px;
  }
`;
const NavFooter = style.nav`
  margin: 0 auto;
  text-align: center;
`;
const ContenedorRedes = style.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
  img{
   display: inline-block;
   margin: 0 15px;
   width: 24px;
  }
`;