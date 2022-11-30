import React from "react";
import { Route, Routes } from "react-router-dom";
import style from "styled-components";
import NavAdmin from "./NavAdmin";
import Products from "./components/Products"

const Admin = () => {
  return (
    <>
      <HeaderProfile className="extendsNavBar">
        <div>
          <h2>Admin Dashboard</h2>
          <p>Control of Products</p>
        </div>
      </HeaderProfile>
      <ContentAdmin>
        <NavAdmin />
        <Routes>
          <Route path="/" element={<h1>Hola</h1>} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<h1>Hola 3</h1>} />
        </Routes>
      </ContentAdmin>
    </>
  );
};

export default Admin;

const HeaderProfile = style.div`
 width: 100%;
 display: flex;
 justify-content: space-between;
 flex-wrap: wrap;
 align-items: center;
 padding: 90px 120px 15px;
 background-color: #f3f3f3;
 border-bottom: 1px solid #e7e7e7;
 h2{
   font-size: 23px;
   margin: 0;
   font-weight: 600;
   text-transform: uppercase;
 }
 p{
  text-transform: uppercase;
 }
`;

const ContentAdmin = style.section`
 display: flex;
`