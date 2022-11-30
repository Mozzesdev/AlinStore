/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Paginacion from "../../components/Paginacion";
import { CartContext } from "../../context/cartContext";
import { db } from "../../Firebase/Credenciales";
import { collection, getDocs } from "firebase/firestore";
import heartIcon from "../../img/heartvacio.svg";
import { useProducts } from "../../admin/context/productsContext";
import { useNavigate } from "react-router-dom";

export default function ContenidoShop({ selectOrderState, allProducts }) {
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(12);

  const { addToCart } = useContext(CartContext);

  const maximo = allProducts.length / porPagina;

  const navigate = useNavigate();

  return (
    <>
      <ContainerShop>
        {allProducts &&
          allProducts
            .sort((a, b) => {
              if (selectOrderState == "Most Recent") {
                if (a.id == b.id) {
                  return 0;
                }
                if (a.id > b.id) {
                  return -1;
                }
                return 1;
              } else if (selectOrderState === "Low to High") {
                if (a.price == b.price) {
                  return 0;
                }
                if (a.price < b.price) {
                  return -1;
                }
                return 1;
              } else if (selectOrderState === "High to Low") {
                if (a.price == b.price) {
                  return 0;
                }
                if (a.price > b.price) {
                  return -1;
                }
                return 1;
              } else if (selectOrderState === undefined) {
                if (a.id == b.id) {
                  return 0;
                }
                if (a.id > b.id) {
                  return -1;
                }
                return 1;
              }
            })
            .slice(
              (pagina - 1) * porPagina,
              (pagina - 1) * porPagina + porPagina
            )
            .map((product, i) => {
              return (
                <ProductsFetch key={product.id}>
                  <ImgProduct
                    onClick={() => navigate(`/product/${product.id}`)}
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
                          <HeartCard>
                            <img src={heartIcon} alt="" />
                          </HeartCard>
                          <AddToCartCard
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <button
                              onClick={() => {
                                addToCart(product);
                              }}
                            >
                              + Add to Cart
                            </button>
                          </AddToCartCard>
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
              );
            })}
      </ContainerShop>
      <Paginacion
        pagina={pagina}
        setPagina={setPagina}
        maximo={Math.ceil(maximo)}
      />
    </>
  );
}

const ContainerShop = styled.div`
  width: 85%;
  margin: 0 auto 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .links-all {
    text-decoration: none;
    color: inherit;
  }
`;

const ProductsFetch = styled.div`
  width: 230px;
  padding: 20px 0;
  margin: 0 20px;
  cursor: pointer;
`;

const ImgProduct = styled.div`
  width: 100%;
  height: 210px;
  border-radius: 4px;
  .product-container {
    width: 100%;
    border-radius: 4px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    opacity: 0;
    transition: 0.5s;
    background-color: #00000021;
    p {
      color: #fff;
    }
    :hover {
      opacity: 1;
      transition: 0.5s;
    }
  }
`;

const LatestText = styled.div`
  width: 100%;
  padding: 10px 0;
  text-align: center;
  h4 {
    font-size: 12.5px;
    opacity: 0.6;
    margin: 0;
  }
  p {
    color: #000;
    font-size: 14px;
    line-height: 1.4;
    font-weight: 500;
    span {
      color: #ca130d;
      font-size: 13px;
      font-weight: 700;
    }
  }
`;

const Spinner = styled.div`
  border: 3px solid #ffffff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border-left-color: transparent;

  animation: spin 1s linear infinite;
`;

const HeartCard = styled.div`
  width: 24px;
  align-self: flex-end;
  margin-right: 6px;
  margin-top: 4px;
  img {
    width: 100%;
  }
`;

const AddToCartCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    border: none;
    padding: 7px 10px;
    background-color: transparent;
    border-radius: 2px;
    font-weight: 500;
    letter-spacing: 1px;
    line-height: 1;
    color: #fff;
    text-transform: uppercase;
    background-color: #d1a734;
    margin: 5px 0;
    color: #fff;
    font-size: 12px;
    transition: 0.3s all;
    :hover {
      background-color: #b18e2e;
    }
  }
`;
