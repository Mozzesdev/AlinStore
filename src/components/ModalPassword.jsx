/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuth } from "../context/authContext";
import { db } from "../Firebase/Credenciales";
import { doc, setDoc } from "firebase/firestore";
import disableScroll from "disable-scroll";
import style from "styled-components";
import userSvg from "../img/user.svg";
import alert from "../img/alert.svg";

const ModalPassword = ({ resetPassword, setResetPassword }) => {
  const [error, setError] = useState();

  const { senResetPassword, loading } = useAuth();

  const navigate = useNavigate();

  const handleResetPassword = async (email)=>{
   try {
    await senResetPassword(email)
    setError('Enlace enviado al correo')
   } catch (error) {
    console.log(error)
   }
  }

  return (
    <>
      {resetPassword && (
        <ContenedorLogin
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Formik
            initialValues={{
              email: "",
            }}
            validate={(valores) => {
              let errores = {};

              // Validacion nombre
              if (!valores.email) {
                errores.email = "Por favor ingresa un email electronico.";
              } else if (
                !/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/.test(
                  valores.email
                )
              ) {
                errores.email =
                  "El email solo puede contener letras, numeros, puntos, guiones y guion bajo.";
              }

              return errores;
            }}
            onSubmit={(valores, { resetForm }) => {
             handleResetPassword(valores.email)
             resetForm()
            }}
          >
            {({ errors, resetForm }) => (
              <Form className="formulario" id="form">
                <h2>Reset Password</h2>
                <div style={{ marginBottom: "20px" }}>
                  <ContainerEmail>
                    <img src={userSvg} className="deco" alt="" />
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email"
                    />
                  </ContainerEmail>

                  <ErrorMessage
                    name="email"
                    component={() => (
                      <ContainerError>
                        <img src={alert} alt="" />
                        <p>{errors.email}</p>
                      </ContainerError>
                    )}
                  />
                </div>

                {error && (
                  <ContainerError id="not-found">
                    <p>
                      <img src={alert} alt="" />
                      {error}
                    </p>
                  </ContainerError>
                )}
                <Terms>
                  By clicking Register, you indicate that you have read and
                  acknowledge the <span>Terms of Service</span> and{" "}
                  <span>Privacy Notice.</span>
                </Terms>

                <BotonSignUp type="submit" className="sign-up">
                  Send Email
                </BotonSignUp>

                <ContainerSwitch>
                  <p>
                    You have an account?{" "}
                    <span
                      onClick={() => {
                        setResetPassword(false);
                        resetForm();
                      }}
                    >
                      Log in
                    </span>
                  </p>
                </ContainerSwitch>
              </Form>
            )}
          </Formik>
        </ContenedorLogin>
      )}
    </>
  );
};

export default ModalPassword;

const ContenedorLogin = style.div`
 width: 560px;
 min-height: 520px;
 background-color: #ffffff;
 position: relative;
 align-items: center;
 padding: 45px 48px 40px;
 border-radius: 3px;
 text-align: left;
 flex-shrink: 0;
 z-index: 15;
 .formulario{
  color: #b4b4b4;
  height: 350px;
  margin-top: 10px;
  input{
   width: 85%;
   color: #808080;
   padding: 5px 0;
   background-color: transparent;
   border: none;
   margin: 0;
   :focus{
    outline: none;
   }
  }
  input::-webkit-input-placeholder{
    font-weight: 400;
    font-size: 16px;
    color: #808080;
  }
  h2{
   color: #a78956;
   font-size: 35px;
   font-weight: 500;
   text-align: center;
   padding: 20px 0 10px;
  }
 }
`;

const ContainerEmail = style.div`
  display: flex;
  align-items: flex-end;
  border-bottom: 1px solid #c2c2c2;
  height: 55px;
  .deco{
   width: 27px;
   transition: width .3s;
   margin-bottom: 6px;
  }
  #email{
    padding-left: 8px;
  }
`;

const ContainerError = style.div`
  display: flex;
  align-items: center;
  text-align: left;
  margin: 8px 0 0;
  p{
   font-size: 14px;
   color: #df4545;
   line-height: 1;
  }
  img{
   width: 18px;
   margin-right: 5px;
   vertical-align: middle;
  }
`;

const BotonSignUp = style.button`
  border: none;
  margin-top: 20px;
  width: 100%;
  font-size: 18px;
  color: #fff;
  border-radius: 4px;
  background: #b6904e;
  height: 48px;
  cursor: pointer;
  transition: background .5s ease;
  :hover{
   background: #b68735;
   transition: background .5s ease;
  }
`;

const Terms = style.p`
  text-align: left;
  font-size: 13px;
  margin-top: 10px;
  color: #979797;
  span{
    cursor: pointer;
    color: #b6904e;
  }
`;

const ContainerSwitch = style.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 2px solid #bdbdbd;
  text-align: center;
  p{  
    margin: 15px;
    color: #5c5c5c;
    display: inline-block;
    font-size: 17px;
    span{
      color: #a78956;
      cursor: pointer;
      font-weight: 500;
    }
  }
`;
