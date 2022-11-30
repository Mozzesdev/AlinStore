import React from "react";
import { NavLink } from "react-router-dom";
import style from "styled-components";
import { useAuth } from '../context/authContext'

function NavAdmin() {
  const ActiveLink = ({ isActive }) => (isActive ? "selected" : "nav-link");

  
  const { user } = useAuth()

  return (
    <>
      <NavigateAdmin>
        <ContainerImg>
          <img src={user.photoURL} alt="" />
          <p>{user.displayName || user.email}</p>
        </ContainerImg>
        <NavLink className={ActiveLink} to="/admin/">
          Dashboard
        </NavLink>
        <NavLink className={ActiveLink} to="/admin/users">
          Users
        </NavLink>
        <NavLink className={ActiveLink} to="/admin/products">
          Products
        </NavLink>
      </NavigateAdmin>
    </>
  );
}

export default NavAdmin;

const NavigateAdmin = style.nav`
 display: flex;
 flex-direction: column;
 width: 220px;
 height: 100vh;
 border-right: 1px solid #e0e0e0;
 margin: 20px 0 20px 60px;
 .nav-link{
  color: rgba(102,102,102,0.85);
  border-bottom: 1px solid #e0e0e0;
  border-right: 1.5px solid #ffffff;
  text-decoration: none;
  padding: 10px 15px 5px 0;
  width: 100%;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: .5px;
  text-transform: uppercase;
  display: flex;
  img{
   width: 18px;
   margin-right: 10px
  }
  :hover{
    border-right: 1.5px solid #e9a674;
    color: rgba(17,17,17,0.85);
    transition: all .4s ease;
  }
 }
 .selected{
   border-right: 1.5px solid #e9a674;
   border-bottom: 1px solid #e0e0e0;
   color: rgba(17,17,17,0.85);
   text-transform: uppercase;
   text-decoration: none;
   font-size: 12px;
   font-weight: 600;
   letter-spacing: .5px;
   padding: 10px 15px 5px 0;
   display: flex;
   img{
    width: 20px;
    margin-right: 10px
   }
 }
`;

const ContainerImg = style.div`
margin: 10px 0;
 img{
   display: block;
   width: 70px;
   border-radius: 50%;
 }
 p{
   margin-top: 5px;
   font-size: 15px;
 }
`