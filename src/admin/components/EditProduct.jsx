/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { db, storage } from "../../Firebase/Credenciales";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import styled from "styled-components";
import nameIcon from "./img/name.svg";
import alertIcon from "./img/alert.svg";
import dollarIcon from "./img/dollar.svg";
import messaIcon from "./img/message.svg";
import commentIcon from "./img/comment.svg";
import PreviewImg from "./PreviewImg";
import api from "../../Api";
import { collection, doc, setDoc } from "firebase/firestore";

const EditProduct = ({
  estado,
  cambiarEstado,
  updateFetchingApi,
  editValues,
  setEditValues,
}) => {
  const [loadingProduct, setLoadingProduct] = useState(false);

  const makeRandomId = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  return (
    <>
      {estado && (
        <OverLay
          onClick={() => {
            cambiarEstado(false);
          }}
        >
          <ContainerModal
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Formik
              initialValues={{
                name: editValues.name,
                price: editValues.price,
                available: editValues.available,
                shortDescription: editValues.shortDescription,
                longDescription: editValues.longDescription,
                category: editValues.category,
                img: null,
              }}
              validate={(values) => {
                let errores = {};
                // Validacion nombre
                if (!values.name) {
                  errores.name = "Este campo no puede estar vacio.";
                }

                if (!values.price) {
                  errores.price = "Este campo no puede estar vacio.";
                }
                if (!values.shortDescription) {
                  errores.shortDescription = "Este campo no puede estar vacio.";
                } else if (
                  !/^[a-zA-Z0-9À-ÿ\s]{8,30}$/.test(values.shortDescription)
                ) {
                  errores.shortDescription =
                    "Esta descripcion debe tener entre 8 a 20 caracteres.";
                }

                if (!values.longDescription) {
                  errores.longDescription = "Este campo no puede estar vacio.";
                } else if (
                  !/^[@$%()?¡,.\-_a-zA-Z0-9À-ÿ\s]{150,1000}$/.test(
                    values.longDescription
                  )
                ) {
                  errores.longDescription =
                    "Esta descripcion debe tener entre 150 a 200 caracteres.";
                }
                if (!values.available) {
                  errores.available = "Este campo no puede estar vacio.";
                }

                if (!values.category) {
                  errores.category = "Este campo no puede estar vacio.";
                }

                if (values.img) {
                  if (values.img.size > 1000000) {
                    errores.img =
                      "El tamaño maximo de una imagen es de 1mb, intenta con otra.";
                  }
                }
                return errores;
              }}
              onSubmit={async (values, { resetForm }) => {
                setLoadingProduct(true);
                let urlsDownload = [];
                let imgNames = [];
                if (values.img) {
                  const localFile = values.img;
                  for (let i = 0; i < localFile.length; i++) {
                    const file = localFile[i];
                    imgNames.push(file.name);
                    const archivoRef = ref(storage, `documents/${file.name}`);
                    await uploadBytes(archivoRef, file);
                    await getDownloadURL(archivoRef).then((url) => {
                      urlsDownload.push(url);
                    });
                  }
                }

                const editProduct = {
                  id: editValues.id,
                  name: editValues.name,
                  price: editValues.price,
                  available: editValues.available,
                  shortDescription: editValues.shortDescription,
                  longDescription: editValues.longDescription,
                  category: editValues.category,
                  imgNames: values.img ? imgNames : editValues.imgNames,
                  imgUrls: values.img ? urlsDownload : editValues.imgUrls,
                  amountOnCart: "0",
                  rating: editValues.rating,
                  freeShipping: editValues.freeShipping,
                };
                const collectionRef = collection(db, "products");
                const docRef = doc(collectionRef, editValues.id);
                try {
                  await setDoc(docRef, editProduct);
                  setLoadingProduct(false);
                  cambiarEstado(false);
                  updateFetchingApi();
                } catch (error) {
                  setLoadingProduct(false);
                  console.log(error);
                }
              }}
            >
              {({ errors, resetForm, setFieldValue, values }) => (
                <Form className="form" autoComplete="off">
                  <h2>
                    <span>Create a Product</span>
                  </h2>
                  <MarginBottom15px>
                    <CollectionOfInputs>
                      <div style={{ width: "290px" }}>
                        <Container>
                          <Field
                            type="text"
                            id="name"
                            name="name"
                            value={editValues.name}
                            onChange={(e) => {
                              setEditValues({
                                ...editValues,
                                name: e.target.value,
                              });
                            }}
                            placeholder="Name of product"
                          />
                          <img src={nameIcon} alt="" />
                        </Container>
                        <ErrorMessage
                          name="name"
                          component={() => (
                            <ContainerError>
                              <img src={alertIcon} alt="" />
                              <p>{errors.name}</p>
                            </ContainerError>
                          )}
                        />
                      </div>
                      <div style={{ width: "300px" }}>
                        <Container>
                          <Field
                            type="number"
                            id="price"
                            name="price"
                            min="0"
                            step="0.01"
                            value={editValues.price}
                            onChange={(e) => {
                              setEditValues({
                                ...editValues,
                                price: e.target.value,
                              });
                            }}
                            placeholder="Price of product"
                          />
                          <img src={dollarIcon} alt="" />
                        </Container>
                        <ErrorMessage
                          name="price"
                          component={() => (
                            <ContainerError>
                              <img src={alertIcon} alt="" />
                              <p>{errors.price}</p>
                            </ContainerError>
                          )}
                        />
                      </div>
                    </CollectionOfInputs>
                    <CollectionOfInputs>
                      <div style={{ width: "290px" }}>
                        <Container>
                          <Field
                            type="number"
                            id="available"
                            name="available"
                            value={editValues.available}
                            onChange={(e) => {
                              setEditValues({
                                ...editValues,
                                available: e.target.value,
                              });
                            }}
                            min="0"
                            placeholder="Products available"
                          />
                          <img src={nameIcon} alt="" />
                        </Container>
                        <ErrorMessage
                          name="available"
                          component={() => (
                            <ContainerError>
                              <img src={alertIcon} alt="" />
                              <p>{errors.available}</p>
                            </ContainerError>
                          )}
                        />
                      </div>
                      <div style={{ width: "300px" }}>
                        <Container>
                          <Field
                            as="select"
                            id="category"
                            name="category"
                            value={editValues.category}
                            onChange={(e) => {
                              setEditValues({
                                ...editValues,
                                category: e.target.value,
                              });
                            }}
                          >
                            <option value="" disabled>
                              Select a category
                            </option>
                            <option value="Clothes">Clothes</option>
                            <option value="Face Mask">Face Mask</option>
                            <option value="Decoration">Decoration</option>
                          </Field>
                        </Container>
                        <ErrorMessage
                          name="category"
                          component={() => (
                            <ContainerError>
                              <img src={alertIcon} alt="" />
                              <p>{errors.category}</p>
                            </ContainerError>
                          )}
                        />
                      </div>
                    </CollectionOfInputs>
                  </MarginBottom15px>
                  <MarginBottom15px>
                    <Container>
                      <Field
                        type="text"
                        id="shortDescription"
                        name="shortDescription"
                        placeholder="Short description"
                        value={editValues.shortDescription}
                        onChange={(e) => {
                          setEditValues({
                            ...editValues,
                            shortDescription: e.target.value,
                          });
                        }}
                      />
                      <img src={messaIcon} alt="" />
                    </Container>
                    <ErrorMessage
                      name="shortDescription"
                      component={() => (
                        <ContainerError>
                          <img src={alertIcon} alt="" />
                          <p>{errors.shortDescription}</p>
                        </ContainerError>
                      )}
                    />
                  </MarginBottom15px>
                  <MarginBottom15px>
                    <Container>
                      <Field
                        type="text-area"
                        id="longDescription"
                        name="longDescription"
                        placeholder="Long description"
                        value={editValues.longDescription}
                        onChange={(e) => {
                          setEditValues({
                            ...editValues,
                            longDescription: e.target.value,
                          });
                        }}
                      />
                      <img src={commentIcon} alt="" />
                    </Container>
                    <ErrorMessage
                      name="longDescription"
                      component={() => (
                        <ContainerError>
                          <img src={alertIcon} alt="" />
                          <p>{errors.longDescription}</p>
                        </ContainerError>
                      )}
                    />
                  </MarginBottom15px>
                  <MarginBottom15px>
                    <InputFile>
                      <ContenedorLabel>
                        <div>
                          <p>Max 1MB.</p>
                          <p>Just files type image.</p>
                          <p>On error, refresh the page.</p>
                        </div>
                        <label htmlFor="img">Select a Image</label>
                      </ContenedorLabel>

                      <input
                        type="file"
                        id="img"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          setFieldValue("img", e.target.files);
                        }}
                      />

                      {values.img ? (
                        <PreviewImg
                          firstImg={values.img[0]}
                          secundImg={values?.img[1]}
                          thirdImg={values?.img[2]}
                          quarterImg={values?.img[3]}
                        />
                      ) : (
                        <div className="loadImgFile">
                          <img
                            src={editValues.imgUrls[0]}
                            className="imgPreview"
                            alt="product.img"
                          />
                        </div>
                      )}
                      <ErrorMessage
                        name="img"
                        component={() => (
                          <ContainerError>
                            <img src={alertIcon} className="warning" alt="" />
                            <p>{errors.img}</p>
                          </ContainerError>
                        )}
                      />
                    </InputFile>
                  </MarginBottom15px>
                  <ContentSubmit>
                    <button type="submit">
                      {loadingProduct === true ? (
                        <div className="spinner" />
                      ) : (
                        "Edit"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        cambiarEstado(false);
                      }}
                    >
                      Cancel
                    </button>
                  </ContentSubmit>
                </Form>
              )}
            </Formik>
          </ContainerModal>
        </OverLay>
      )}
    </>
  );
};

export default EditProduct;

const OverLay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 120;
`;

const ContainerModal = styled.div`
  width: 60%;
  min-height: 490px;
  background-color: #fdfdfd;
  border-radius: 5px;
  .form {
    color: #1a1a1a;
    padding: 20px 10px;
    width: 100%;
    height: 100%;
    h2 {
      text-align: center;
      span {
        font-size: 23px;
        font-weight: 500;
        letter-spacing: 1px;
        text-transform: uppercase;
        margin: 0 15px;
      }
      b {
        display: block;
        flex: 1;
        height: 2px;
        opacity: 0.3;
        background-color: #000;
      }
    }
    #category {
      width: 100%;
      padding: 10px 5px;
      background-color: transparent;
      border: none;
      color: #727272;
      font-size: 14px;
      margin: 0;
      :focus {
        outline: none;
      }
    }
    input {
      width: 85%;
      color: #b3b3b3;
      font-size: 14px;
      padding: 10px 5px 3px;
      background-color: transparent;
      border: none;
      margin: 0;
      :focus {
        outline: none;
      }
    }
  }
`;

const MarginBottom15px = styled.div`
  margin: 0 0 20px;
`;

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  margin: 0 30px;
  align-items: flex-end;
  border-bottom: 1px solid #49350b;
  height: 45px;
  img {
    width: 20px;
    cursor: pointer;
    transition: width 0.3s;
    margin-bottom: 6px;
    :hover {
      width: 23px;
      transition: width 0.3s;
    }
  }
`;

const ContainerError = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  margin: 8px 0 0 27px;
  color: #df4545;
  p {
    font-size: 12px;
    line-height: 1;
  }
  img {
    width: 16px;
    margin-right: 5px;
    vertical-align: middle;
  }
`;

const CollectionOfInputs = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ContentSubmit = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  button {
    padding: 4px 18px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 13px;
    color: #fff;
    margin: 0 10px;
    border: none;
    border-radius: 6px;
    background-color: #2cc433;
    transition: background-color 0.3s;
    :hover {
      background-color: #208f25;
      transition: background-color 0.3s;
    }
    :last-child {
      background-color: #cf2317;
      transition: background-color 0.3s;
      :hover {
        background-color: #972921;
        transition: background-color 0.3s;
      }
    }
  }
`;

const ContenedorLabel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  height: 100%;
  p {
    width: 100%;
    color: #464646;
    font-size: 12px;
    margin: 1px 0;
    line-height: 1.5;
  }
  label {
    text-align: center;
  }
`;

const InputFile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: none;
  height: 90px;
  margin: 0 30px;
  .warning {
    width: 20px;
    cursor: pointer;
    transition: width 0.3s;
    margin-bottom: 6px;
    :hover {
      width: 23px;
      transition: width 0.3s;
    }
  }
  #img {
    display: none;
  }
  label {
    color: #fff;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 10px;
    background-color: #166477;
    transition: background-color 0.3s;
    padding: 3px 15px;
    :hover {
      background-color: #127e66;
      transition: background-color 0.3s;
    }
  }
`;
