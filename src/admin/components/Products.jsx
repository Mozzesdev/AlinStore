/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import style from "styled-components";
import api from "../../Api";
import { db } from "../../Firebase/Credenciales";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import ModalInfo from "./ModalInfo";
import { collection, getDocs, orderBy } from "firebase/firestore";
import { useProducts } from "../context/productsContext";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowInfo, setModalShowInfo] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValues, setEditValues] = useState(null);
  const [showInfoData, setShowInfoData] = useState(null);

  const { deleteTheProduct, loadingProduct, setLoadingProduct, categories, updateFetchingApiCategories } = useProducts();

  const editProduct = async (product) => {
    setEditValues(product);
    setModalShowEdit(true);
  };

  const getListOfAllProducts = async () => {
    const products = [];
    const producstRef = collection(db, "products");
    const snapshot = await getDocs(producstRef);
    snapshot.forEach((doc) => {
      products.push(doc.data());
    });
    return products;
  };

  const updateFetchingApi = () => {
    getListOfAllProducts().then((products) => {
      setAllProducts(products);
    });
  };

  useEffect(() => {
    updateFetchingApi();
    updateFetchingApiCategories()
  }, []);

  const openModal = async (product) => {
    setShowInfoData(product);
    setModalShowInfo(true);
  };

  return (
    <>
      <EditProduct
        estado={modalShowEdit}
        cambiarEstado={setModalShowEdit}
        updateFetchingApi={updateFetchingApi}
        editValues={editValues}
        setEditValues={setEditValues}
        editId={editId}
      />
      <CreateProduct
        estado={modalShow}
        cambiarEstado={setModalShow}
        categories={categories}
        updateFetchingApi={updateFetchingApi}
      />

      <ModalInfo
        estado={modalShowInfo}
        cambiarEstado={setModalShowInfo}
        updateFetchingApi={updateFetchingApi}
        setShowInfoData={setShowInfoData}
        showInfoData={showInfoData}
        loadingProduct={loadingProduct}
      />
      <ContainerProducts>
        <h2>Products</h2>
        <ContainerTools>
          <input
            type="text"
            placeholder="Search"
            id="searchProduct"
            name="searchProduct"
          />
          <button onClick={() => setModalShow(!modalShow)}>
            <span>+</span> Add Product
          </button>
        </ContainerTools>
        <hr />
        <MapFetch>
          {allProducts &&
            allProducts
              .sort((a, b) => {
                if (a.id == b.id) {
                  return 0;
                }
                if (a.id > b.id) {
                  return -1;
                }
                return 1;
              })
              .map((product, i) => (
                <ProductsFetch key={product.id + i}>
                  <ImgProduct
                    style={{
                      backgroundImage: `url(${product.imgUrls[0]})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="product-container">
                      {loadingProduct === true ? (
                        <Spinner />
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              deleteTheProduct(
                                product.id,
                                product.imgNames
                              ).then(() => {
                                setLoadingProduct(false);
                                updateFetchingApi();
                              });
                            }}
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              editProduct({... product});
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              openModal({ ...product });
                            }}
                          >
                            Informacion
                          </button>
                        </>
                      )}
                    </div>
                  </ImgProduct>
                  <LatestText>
                    <h4>{product.shortDescription}</h4>
                    <p>
                      {product.name} - <span>${product.price}</span>
                    </p>
                  </LatestText>
                </ProductsFetch>
              ))}
        </MapFetch>
      </ContainerProducts>
    </>
  );
};

export default Products;

const ContainerProducts = style.div`
 width: 75%;
 margin: 30px 0 30px 30px;
 h2{
   font-size: 24px;
   font-weight: 600;
   text-transform: uppercase;
   padding-bottom: 20px;
 }
`;

const ContainerTools = style.div`
 width: 94%;
 padding: 0 0 20px;
 display: flex;
 justify-content: space-between;
 button{
  border: none;
  padding: 3px 19px 3px 15px;
  border-radius: 4px;
  color: #fff;
  background-color: #0fc527;
  transition: background-color .4s ease;
  font-size: 13px;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  span{
    font-size: 17px;
    line-height: 1;
    font-weight: 800;
  }
  :hover{
    background-color: #0ca120;
    transition: background-color .4s ease;
  }
 }
 #searchProduct{
   border: none;
   border-bottom: 1px solid #c9c9c9;
   background-color: transparent;
   font-size: 13px;
   color: #616161;
   padding: 4px 20px 0 0;
   :focus{
     outline: none;
   }
   ::-webkit-input-placeholder{
    font-weight: 500;
    font-size: 15px;
    color: #afafaf;
  }
 }
`;

const ProductsFetch = style.div`
 width: 210px;
 padding: 20px 0;
 margin: 0 20px;
`;

const ImgProduct = style.div`
 width: 100%;
 height: 210px;
 border-radius: 2px;
 .product-container{
  width: 100%;
  border-radius: 4px;
  height: 100%;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: .5s;
  align-items: center;
  justify-content: center;
  background-color: #00000053;
  p{
    color: #fff;
  }
    button{
      border: none;
      padding: 5px 10px;
      background-color: transparent;
      border-radius: 2px;
      font-weight: 500;
      letter-spacing: 1px;
      font-size: 13px;
      line-height: 1;
      color: #fff;
      text-transform: uppercase;
      margin: 5px 0;
    }
    :hover{
      opacity: 1;
      transition: .5s;
    }
 }
`;

const LatestText = style.div`
 width: 100%;
 padding: 10px 0;
  text-align: center;
  h4{
    font-size: 12.5px;
    opacity: .6;
    margin: 0;
  }
  p{
    color: #000;
    font-size: 14px;
    line-height: 1.4;
    font-weight: 500;
    span{
      color: #ca130d;
      font-size: 13px;
      font-weight: 700;
    }
  }
`;

const MapFetch = style.div`
  display: flex;
  flex-wrap: wrap;
`;

const Spinner = style.div`
  border: 3px solid #ffffff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border-left-color: transparent;

  animation: spin 1s linear infinite;
`;
