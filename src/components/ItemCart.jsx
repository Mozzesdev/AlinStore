import React, { useContext } from "react";
import style from "styled-components";
import { CartContext } from "../context/cartContext";

const ItemCart = ({ item }) => {

 const { addToCart, deleteItemOnCart } = useContext(CartContext);

  return (
    <>
      <ContainerCartItem>
        <CotainerButtons>
          <img src={item.imgUrl} alt="" />
          <div className="divItem">
            <p>{item.name}</p>
            <div className='divButtons'>
              <button onClick={()=> addToCart(item)}>Add</button>
              <button onClick={()=> deleteItemOnCart(item)}>Remove</button>
            </div>
          </div>
        </CotainerButtons>
        <ContainerTotal>
          <p className='amountCart'>x{item.amountOnCart}</p>
          <p>Total: ${item.amountOnCart * item.price}</p>
        </ContainerTotal>
      </ContainerCartItem>
    </>
  );
};

export default ItemCart;

const ContainerCartItem = style.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: auto;
  padding: 5px 10px;
  background-color: #4b4b4b;
  margin-bottom: 10px;
  :last-child{
   margin-bottom: 0px;
  }
`;

const CotainerButtons = style.div`
 align-items: center;
 display: flex;
 p{
  font-size: 12px;
  color: #fff;
  font-weight: 800;
  margin-left: 2px; 
 }
 .divButtons{
  display: flex;
  padding: 1px;
  button{
   font-size: 11px;
   border: none;
   padding: 3px 6px;
   line-height: 1;
   border-radius: 5px;
   margin: 0 2px;
   text-transform: uppercase;
   font-weight: 700;
  }
 }
 .divItem{
  display: block;
  margin-left: 7px;
 }
 img{
  width: 50px;
  height: 50px;
  object-fit: cover;
 }

`;

const ContainerTotal = style.div`
text-align: right;
 p{
  font-size: 12px;
  color: #fff;
  font-weight: 700;
 }
 .amountCart{
  background-color: #d42929;
  line-height: 1;
  padding: 4px 6px;
  font-weight: 600;
  border-radius: 50%;
  display: inline-block; 
 }
`;
