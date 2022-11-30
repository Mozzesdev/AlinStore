import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import styled from "styled-components";
import { Link } from "react-router-dom";
import fontuser from '../img/fontuser.png'
const Profile = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    document.title = "My Profile - AlinDesign";
  }, []);


  return (
    <>
      <HeaderProfile className="extendsNavBar">
        <div>
          <h2>My Account</h2>
          <p>Details from my account</p>
        </div>
          {user.role === 'admin' && <Link to='/admin/' className='buttonAdmin'>Admin</Link>}
      </HeaderProfile>
      <BodyProfile>
        <CartAccount>
          <h4>My Cart</h4>
        </CartAccount>
        <DetailsAccount>
          <h4>Details</h4>
          {user.photoURL ? <img src={user.photoURL} alt="" /> : <img src={fontuser} alt="" />}
          <p>{user.displayName || user.email}</p>
          <p>Mexico</p>
          <p>Direcciones</p>
          <button className="log-out" onClick={async ()=> await logout()}>Cerrar Sesión</button>
        </DetailsAccount>
      </BodyProfile>
    </>
  );
};

export default Profile;

const HeaderProfile = styled.div`
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
 .buttonAdmin{
   text-decoration: none;
   padding: 7px 15px;
   background-color: #bb1313; 
   transition: background-color .5s;
   color: #fff;
   line-height: 1;
   border-radius: 4px;
   font-size: 14px;
   font-weight: 600;
   text-transform: uppercase;
   margin-right: 30px;
   :hover{
    background-color: #d61f1f;
    transition: background-color .5s;
   }
 }
`;

const BodyProfile = styled.section`
 width: 85%;
 height: 55vh;
 margin: 30px auto;
 display: grid;
 grid-template-columns: 2fr 1fr;
`;

const CartAccount = styled.div`
 margin-right: 50px;
 h4{
  border-bottom: 1px solid #9b9b9b;
  padding-bottom: 7px;
 }
`;

const DetailsAccount = styled.div`
 img{
   display: block;
   margin-top: 10px;
   width: 75px;
   border-radius: 50%;
 }
  h4{
    border-bottom: 1px solid #9b9b9b;
    padding-bottom: 7px;
  }
  .log-out{
    border: none;
    margin-top: 3px;
    padding: 2px 5px;
    background-color: #d41d1d;
    color: #f1f1f1;
    font-size: 12px;
    transition: .3s all;
    :hover{
      background-color: #af1c1c;
    }
  }
`;
