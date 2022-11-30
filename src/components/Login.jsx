/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuth } from "../context/authContext";
import { db } from "../Firebase/Credenciales";
import { doc, setDoc } from "firebase/firestore";
import ModalPassword from "./ModalPassword";
import disableScroll from "disable-scroll";
import styled from "styled-components";
import googleIcon from "../img/google-icon.svg";
import userSvg from "../img/user.svg";
import lockSvg from "../img/lock.svg";
import alert from "../img/alert.svg";
import eye from "../img/eye.png";
import hide from "../img/hide.png";

const Login = ({ estado, cambiarEstado }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [hidePass, setHidePass] = useState(false);
  const [hidePassRepeat, setHidePassRepeat] = useState(false);
  const [error, setError] = useState();
  const [resetPassword, setResetPassword] = useState(false)

  const { signup, login, loginWithGoogle } = useAuth();

  const navigate = useNavigate();

  const handleGoogle = async () => {
    await loginWithGoogle();
    cambiarEstado(!estado);
    disableScroll.off();
    setIsRegistering(false);
    setError("");
  };

  function showPassword() {
    let type = document.getElementById("password");
    if (type.type === "password") {
      type.type = "text";
    } else {
      type.type = "password";
    }
  }
  function showRepeat() {
    let type = document.getElementById("repeat");
    if (type.type === "password") {
      type.type = "text";
    } else {
      type.type = "password";
    }
  }
  return (
    <>
      {estado && (
        <Overlay
          onClick={() => {
            cambiarEstado(false);
            disableScroll.off();
            setIsRegistering(false);
            setResetPassword(false)
            setError("");
          }}
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="50"
          data-aos-offset="0"
        >
            {resetPassword ? <ModalPassword resetPassword={resetPassword} setResetPassword={setResetPassword} /> : 
            
          <ContenedorLogin
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
            <Formik
              initialValues={{
                email: "",
                password: "",
                repeat: "",
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

                // Validacion password
                if (!valores.password) {
                  errores.password = "Por favor ingresa un contraseña.";
                } else if (!/^[a-z0-9A-ZÀ-ÿ\s]{8,20}$/.test(valores.password)) {
                  errores.password =
                    "La longitud de la contraseña es de 8 a 20 caracteres.";
                }
                //Validacion Registro
                if (isRegistering) {
                  if (!valores.repeat) {
                    errores.repeat = "Por favor repite la contraseña.";
                  } else if (valores.repeat !== valores.password) {
                    errores.repeat = "Las contraseñas no coinciden.";
                  }
                }

                return errores;
              }}
              onSubmit={async (valores, { resetForm }) => {
                setError("");
                if (isRegistering) {
                  try {
                    const role = "user";
                    await signup(valores.email, valores.password);
                    const docRef = doc(db, `users/${valores.email}`);
                    setDoc(docRef, { email: valores.email, role: role });
                    navigate("/shop");
                    resetForm();
                    cambiarEstado(false);
                    disableScroll.off();
                    setIsRegistering(false);
                    setError("");
                  } catch (error) {
                    if (error.code === "auth/email-already-in-use") {
                      setError("El email proporcionado ya esta en uso.");
                    }
                  }
                }
                try {
                  await login(valores.email, valores.password);
                  navigate("/shop");
                  resetForm();
                  cambiarEstado(false);
                  disableScroll.off();
                  setIsRegistering(false);
                  setError("");
                } catch (error) {
                  if (error.code === "auth/user-not-found") {
                    setError("El usuario no existe.");
                  } else if (error.code === "auth/wrong-password") {
                    setError("La contraseña es incorrecta.");
                  }
                }
              }}
            >
              {({ errors, resetForm }) => (
                <Form className="formulario" id="form">
                  {isRegistering ? <h2>Register</h2> : <h2>Log in</h2>}
                  {isRegistering ? (
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
                  ) : (
                    <div style={{ marginBottom: "20px", marginTop: "30px" }}>
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
                  )}

                  <div
                    style={
                      isRegistering
                        ? { paddingBottom: "20px" }
                        : { paddingBottom: "10px" }
                    }
                  >
                    <ContainerPassword>
                      <img src={lockSvg} className="deco" alt="" />
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                      />
                      {!hidePass ? (
                        <img
                          src={eye}
                          onClick={() => {
                            showPassword();
                            setHidePass(true);
                          }}
                          className="show-password"
                          alt=""
                        />
                      ) : (
                        <img
                          src={hide}
                          onClick={() => {
                            showPassword();
                            setHidePass(false);
                          }}
                          className="show-password"
                          alt=""
                        />
                      )}
                    </ContainerPassword>

                    <ErrorMessage
                      name="password"
                      component={() => (
                        <ContainerError>
                          <img src={alert} alt="" />
                          <p>{errors.password}</p>
                        </ContainerError>
                      )}
                    />
                  </div>

                  {isRegistering && (
                    <div style={{ marginBottom: "15px" }}>
                      <ContainerPassword>
                        <img src={lockSvg} className="deco" alt="" />
                        <Field
                          type="password"
                          id="repeat"
                          name="repeat"
                          placeholder="Repeat password"
                        />
                        {!hidePassRepeat ? (
                          <img
                            src={eye}
                            onClick={() => {
                              showRepeat();
                              setHidePassRepeat(true);
                            }}
                            className="show-password"
                            alt=""
                          />
                        ) : (
                          <img
                            src={hide}
                            onClick={() => {
                              showRepeat();
                              setHidePassRepeat(false);
                            }}
                            className="show-password"
                            alt=""
                          />
                        )}
                      </ContainerPassword>

                      <ErrorMessage
                        name="repeat"
                        component={() => (
                          <ContainerError>
                            <img src={alert} alt="" />
                            <p>{errors.repeat}</p>
                          </ContainerError>
                        )}
                      />
                    </div>
                  )}

                  {error && (
                    <ContainerError id="not-found">
                      <p>
                        <img src={alert} alt="" />
                        {error}
                      </p>
                    </ContainerError>
                  )}

                  {isRegistering ? (
                    <Terms>
                      By clicking Register, you indicate that you have read and
                      acknowledge the <span>Terms of Service</span> and{" "}
                      <span>Privacy Notice.</span>
                    </Terms>
                  ) : (
                    <></>
                  )}

                  {isRegistering ? (
                    <></>
                  ) : (
                    <ForgotPass>
                      <p className="forgot" href="!#" onClick={()=>{
                        setResetPassword(true)
                        }}>
                        Forgot password?
                      </p>
                    </ForgotPass>
                  )}

                  {isRegistering ? (
                    <BotonSignUp type="submit" className="sign-up">
                      Register
                    </BotonSignUp>
                  ) : (
                    <BotonSignUp type="submit" className="sign-up">
                      Log in
                    </BotonSignUp>
                  )}

                  {!isRegistering && (
                    <>
                      <ContaierAuthGoogle>
                        <h4>OR</h4>
                        <AuthGoogle onClick={handleGoogle} type="button">
                          <div>
                            <img src={googleIcon} alt="" />
                          </div>
                          Continue with Google
                        </AuthGoogle>
                      </ContaierAuthGoogle>
                    </>
                  )}

                  <ContainerSwitch>
                    {isRegistering ? (
                      <p>
                        You have an account?{" "}
                        <span
                          onClick={() => {
                            setIsRegistering(false);
                            setHidePass(false);
                            resetForm();
                          }}
                        >
                          Log in
                        </span>
                      </p>
                    ) : (
                      <p>
                        Don't have an account?{" "}
                        <span
                          onClick={() => {
                            setIsRegistering(true);
                            setHidePass(false);
                            resetForm();
                          }}
                        >
                          Create One
                        </span>
                      </p>
                    )}
                  </ContainerSwitch>
                </Form>
              )}
            </Formik>    
          </ContenedorLogin>}
        </Overlay>
      )}
    </>
  );
};

export default Login;

const Overlay = styled.div`
 width: 100vw;
 height: 100vh;
 background-color: rgba(0,0,0,.6);
 display: flex;
 position: fixed;
 align-items: center;
 justify-content: center;
 top: 0;
 left: 0;
 z-index: 12;
`;

const ContenedorLogin = styled.div`
 width: 560px;
 min-height: 620px;
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
  height: 450px;
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

const ContainerPassword = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid #c2c2c2;
  height: 55px;
  .show-password{
   width: 27px;
   cursor: pointer;
   transition: width .3s;
   margin-bottom: 6px;
   :hover{
    width: 29px;
    transition: width .3s;
   }
  }
  .deco{
    width: 27px;
    transition: width .3s;
    margin-bottom: 6px;
   }
`;

const ContainerEmail = styled.div`
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

const ContainerError = styled.div`
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
const ForgotPass = styled.div`
  .forgot{
   text-align: left;
   display: inline-block;
   cursor: pointer;
   color: #a78956;
   font-size: 15px;
   padding: 10px 0 0;
  }
`;

const BotonSignUp = styled.button`
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

const Terms = styled.p`
  text-align: left;
  font-size: 13px;
  margin-top: 10px;
  color: #979797;
  span{
    cursor: pointer;
    color: #b6904e;
  }
`;

const ContainerSwitch = styled.div`
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

const ContaierAuthGoogle = styled.div`
  margin-top: 20px;
  h4{
    text-align: center;
    color: #696969;
    font-weight: 500;
    margin-bottom: 10px;
  }
`;

const AuthGoogle = styled.button`
  display: flex;
  margin: 0 auto;
  align-items: center;
  padding: 1px 2px;
  background-color: #1e6ce2;
  width: 240px;
  font-weight: 600;
  border: none;
  color: #fff;
  border-radius: 2px;
  div{ 
    padding: 7px;
    display: flex;
    background-color: #fff;
    align-items: center;
    margin-right: 20px;
    border-radius: 2px;
    img{
      width: 25px;
    }
  }
`;
