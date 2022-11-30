import { useContext, useState, useEffect } from "react";
import style from "styled-components";
import { CartContext } from "../context/cartContext";
import paypalIcon from "../img/paypal.icon.svg";
import cardlIcon from "../img/card.icon.svg";
import closeIcon from "../img/close.icon.svg";
import backArrow from "../img/arrowleft.svg";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [productsLength, setProductsLength] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState({
    checked: "card-method",
  });
  const { cartItems, addToCart, deleteItemOnCart, deleteAllItemOnCart } =
    useContext(CartContext);

  useEffect(() => {
    setProductsLength(
      cartItems.reduce(
        (previous, current) => previous + current.amountOnCart,
        0
      )
    );
  }, [cartItems]);

  const shipping = 15;

  const navigate = useNavigate();

  const total = cartItems.reduce(
    (previous, current) => previous + current.amountOnCart * current.price,
    0
  );
  useEffect(() => {
    document.title = "MyCart - AlinDesign";
   }, []);

  return (
    <ContainerPage className="extendsNavBar">
      <ContainerCartPage>
        <ItemsOnCart>
          <div className="title-cart">
            <h2>Shopping Cart.</h2>
            <h2>{productsLength} Items</h2>
          </div>
          <div className="cart-title">
            <p className="products-title">Products Details</p>
            <p className="center">Quantity</p>
            <p className="center">Price</p>
            <p className="center">Total Price</p>
          </div>
          <div className="item-div">
            {cartItems.length === 0 ? (
              <p>Tu carrito esta vacio</p>
            ) : (
              cartItems.map((item) => (
                <div className="cartDetails" key={item.id}>
                  <Products>
                    <img src={item.imgUrl} alt="" />
                    <div className="productDetails">
                      <p className="nameProduct">{item.name}</p>
                      <p className="categoryProduct">{item.category}</p>
                      <p className="descriptionProduct">
                        {item.shortDescription}
                      </p>
                    </div>
                  </Products>
                  <Quantity>
                    <button onClick={() => deleteItemOnCart(item)}>-</button>
                    <input type="number" value={item.amountOnCart} disabled />
                    <button onClick={() => addToCart(item)}>+</button>
                  </Quantity>
                  <Price>
                    <p>${item.price}</p>
                  </Price>
                  <Total>
                    <p>${item.price * item.amountOnCart}</p>
                  </Total>
                  <button
                    className="btn-remove__item"
                    onClick={() => deleteAllItemOnCart(item)}
                  >
                    <img src={closeIcon} alt="" />
                  </button>
                </div>
              ))
            )}
          </div>
          <SubTotal>
            <button onClick={() => navigate('/shop')}>
              <img src={backArrow} alt="" /> Continue Shopping
            </button>
            <div className="details-total">
              <div>
                <p>Subtotal: </p>
                <p>
                  <span>${total}</span>
                </p>
              </div>
              <div>
                <p>Shipping: </p>
                <p>
                  <span>${shipping}</span>
                </p>
              </div>
              <div className="total-products">
                <p>Total: </p>
                <p>
                  <span>${total + shipping}</span>
                </p>
              </div>
            </div>
          </SubTotal>
        </ItemsOnCart>
        <CheckOutDiv>
          <div className="bg-check">
            <h2>Payment Info.</h2>
            <h4>Payment Method:</h4>
            <PaymentMethosInputs>
              <div>
                <input
                  type="radio"
                  id="card-input"
                  name="payment-input"
                  value="card-method"
                  checked={paymentMethod.checked === "card-method"}
                  onChange={(e) =>
                    setPaymentMethod({ checked: e.target.value })
                  }
                />
                <label htmlFor="card-input">
                  <img src={cardlIcon} alt="" /> Credit Card
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="paypal-input"
                  name="payment-input"
                  value="paypal-method"
                  checked={paymentMethod.checked === "paypal-method"}
                  onChange={(e) =>
                    setPaymentMethod({ checked: e.target.value })
                  }
                />
                <label htmlFor="paypal-input">
                  <img src={paypalIcon} alt="" /> PayPal
                </label>
              </div>
            </PaymentMethosInputs>
            <InputsCard>
              <div>
                <label htmlFor="name-on__card">Name on Card</label>
                <input
                  type="text"
                  name="name-on__card"
                  disabled={paymentMethod.checked === "paypal-method"}
                  placeholder="Jhon Carter"
                />
              </div>
              <div>
                <label htmlFor="card-number">Card Number</label>
                <input
                  type="text"
                  name="card-number"
                  disabled={paymentMethod.checked === "paypal-method"}
                  placeholder="4242-4242-4242"
                />
              </div>
              <div>
                <label htmlFor="card-number">Card Number</label>
                <input
                  type="text"
                  name="card-number"
                  disabled={paymentMethod.checked === "paypal-method"}
                  placeholder="4242-4242-4242"
                />
              </div>
            </InputsCard>
            <ButtonCheckOut>
              {paymentMethod.checked === "paypal-method" ? (
                <>
                  <button>Paypal</button>
                </>
              ) : (
                <>
                  <button>CheckOut</button>
                </>
              )}
            </ButtonCheckOut>
          </div>
        </CheckOutDiv>
      </ContainerCartPage>
    </ContainerPage>
  );
};


export default Cart;

const ContainerPage = style.div`
 width: 87%;
 margin: 0 auto;
`;

const ContainerCartPage = style.div`
 width: 100%;
 height: 100vh;
 display: grid;
 grid-template-columns: 2.5fr 1fr;
`;

const ItemsOnCart = style.div`
 width: 100%;
 padding: 20px 40px 20px 20px;
 .title-cart{
  display: flex;
  justify-content: space-between;
  margin-bottom: 35px;
  h2{
    font-size: 22px;
    color: #000;
    font-weight: 700;
  }
 }
 .item-div{
   margin-bottom: 20px;
   max-height: 320px;
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
 }
 .cart-title{
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr .4fr;
  border-bottom: 1px solid #adadad;
  padding: 0  0 17px 0;
  margin-bottom: 10px;
  .products-title{
   margin-left: 7px;
  }
  .center{
   text-align: center;
  }
  p{
    line-height: 1;
    font-size: 13px;
    color: #000;
    font-weight: 600;
  }
 }
 .cartDetails{
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr .4fr;
  align-items: center;
  margin-bottom: 20px;
 .btn-remove__item{
  text-align: center;
  margin: 0 auto;
  width: 24px;
  heigth: 24px;
  border: none;
  line-height: 1;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  img{
    width: 100%;
    heigth: 100%;
  }
 }
 }
`;

const Products = style.div`
 display: flex;
 align-items: center; 
 img{
  width: 90px;
  height: 90px;
  object-fit: cover;
  margin-left: 10px;
 }
 .productDetails{
  margin-left: 10px;
   .nameProduct{
    color: #000;
    font-size: 13px;
    font-weight: 500; 
   }
   .categoryProduct{
    color: #535353;
    font-size: 12px;
   }
   .descriptionProduct{
    color: #535353;
    font-size: 12px;
   }
 }
`;

const Quantity = style.div`
 display: flex;
 align-items: center;
 justify-content: center; 
 button{
  border: none;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer; 
  background-color: transparent;
  :focus{
   outline: none; 
  }
 }
 input{
  width: 30px;
  height: 100%;
  text-align: center;
  line-height: 1; 
  padding: 6px 10px;
  font-size: 13px; 
  border: 1px solid #f1f1f1;
  margin: 0 10px;
  :focus{
   outline: none; 
  }
 }
`;

const Price = style.div`
 p{
  text-align: center;
  color: #000;
  font-size: 14px;
  font-weight: 500; 
 }
`;

const Total = style.div`
 p{
  text-align: center;
  color: #000;
  font-size: 14px;
  font-weight: 500; 
 }
`;

const SubTotal = style.div`
 display: flex;
 justify-content: space-between;
 width: 100%;
 align-items: center;
 button{
   align-self: flex-end;
   background-color: transparent;
   padding: 0;
   line-height: 1;
   color: #000;
   font-weight: 600;
   font-size: 14px;
   border: none;
   img{
     width: 26px;
     height: 100%;
   }
 }
 .details-total{
   width: 250px;
   padding: 0 20px;
   div{
     width: 80%;
     display: flex;
     justify-content: space-between;
     margin: 0 auto;
     p{
       color: #686868;
       font-size: 13px;
       font-weight: 500;
       span{
         color: #000;
         font-size: 13px;
       }
     }
    }
    .total-products{
      width: 100%;
      border-top: 1px solid #e1e1e1;
      padding-top: 10px;
      p{
        font-size: 15px;
        color: #000;
        font-weight: 600;
        span{
         font-size: 15px;
        }
      }
    }
 }
`;

const CheckOutDiv = style.div`
width: 100%;
 .bg-check{
   background-color: #f8f8f8;
   padding: 20px 30px 10px;
   h2{
     font-size: 22px;
     color: #000;
     font-weight: 800;
     padding-bottom: 35px;
   }
   h4{
     font-size: 12px;
     color: #686868;
     padding-bottom: 10px;
     font-weight: 500;
   }
 }
`;

const PaymentMethosInputs = style.div`
 div{
   display: flex;
   align-items: center;
   margin-bottom: 12px;
   label{
    display: flex;
    align-items: center;
    margin-left: 10px;
    color: #000;
    font-weight: 600;
    font-size: 12px;
    img{
      width: 24px;
      margin: 0 6px 0 0;
      height: 24px; 
    } 
   }
   input{
    width: 15px;
    height: 15px;
    background-color: #000;
    :focus{
      outline: none;
    }
   }
 }

`;

const InputsCard = style.div`
 padding-top: 29px;
 div{
   display: flex;
   flex-direction: column;
   margin: 0 0 35px 0;
  label{
    font-size: 13px;
    color: #686868;
    font-weight: 500;
    line-height: 1;
    margin: 0 0 15px 0;
  }
  input{
    border: none;
    border-bottom: 1px solid #e1e1e1;
    font-size: 13px;
    line-height: 1;
    font-weight: 500;
    color: #000;
    width: 90%;
    padding: 0 0 5px;
    background-color: transparent;
    :focus{
      outline: none;
    }
    ::-webkit-input-placeholder{
      font-size: 13px;
      font-weight: 500;
      color: #888888;
    }
  }
 }
`;

const ButtonCheckOut = style.div`
  width: 100%;
  margin-top: 70px;
  button{
    width: 100%;
    padding: 5px 0;
    border: none;
    background: #243afd;
    color: #fff;
    font-weight: 600;
    font-size: 15px;
    border-radius: 4px;
    transition: .5s;
    :hover{
      background: #1f30c9;
      transition: .5s;
    }
  }
`;
