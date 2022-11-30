import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../admin/context/productsContext";
import { motion } from "framer-motion";
import { CartContext } from "../../context/cartContext";
import RelatedProducts from "./RelatedProducts";
import ContainerReviews from "./ContainerReviews";
import ModalBuyNow from "../../components/ModalBuyNow";
import { useAuth } from "../../context/authContext";

const Product = () => {
  const [productSelected, setProductSelected] = useState(null);
  const [networkError, setNetworkError] = useState(false);
  const [modalBuy, setModalBuy] = useState(false);
  const [hover, setHover] = useState("");
  const [descriptionAndReview, setDescriptionAndReview] =
    useState("description");

  const navigate = useNavigate();

  const stars = Array(5).fill(0);

  const { id } = useParams();

  const { user } = useAuth();

  const { getListOfOneProduct, loadingProduct, setLoadingProduct } =
    useProducts();

  const { addToCartWithAmount, cartItems } = useContext(CartContext);

  const getProductInfo = async () => {
    setLoadingProduct(true);
    const product = await getListOfOneProduct(id);
    return product;
  };

  const updateProductInfo = async () => {
    await getProductInfo()
      .then(async (product) => {
        setHover(product.imgUrls[0]);
        setProductSelected(product);
        setLoadingProduct(false);
      })
      .catch((error) => {
        if (error.code == "unavailable") {
          setLoadingProduct(false);
          setNetworkError(true);
        }
      });
  };

  useEffect(() => {
    updateProductInfo();
  }, []);

  useEffect(() => {
    document.title = `${productSelected?.name || "Shop"} - AlinDesign`;
  }, [productSelected]);

  if (networkError == true) {
    const Container = styled.div`
      height: 100vh;
      display: grid;
      place-items: center;
      svg {
        transform: scale(2.5);
        fill: #686868;
        width: 24px;
        height: 24px;
        margin-bottom: 20px;
      }
      .container-error {
        margin-bottom: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
          font-size: 16px;
          color: #686868;
          font-weight: 500;
        }
      }
    `;
    return (
      <>
        <Container className="extendsNavBar">
          <div className="container-error">
            <motion.svg
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <path d="m1.293 8.395 1.414 1.414c.504-.504 1.052-.95 1.622-1.359L2.9 7.021c-.56.422-1.104.87-1.607 1.374zM6.474 5.06 3.707 2.293 2.293 3.707l18 18 1.414-1.414-5.012-5.012.976-.975a7.86 7.86 0 0 0-4.099-2.148L11.294 9.88c2.789-.191 5.649.748 7.729 2.827l1.414-1.414c-2.898-2.899-7.061-3.936-10.888-3.158L8.024 6.61A13.366 13.366 0 0 1 12 6c3.537 0 6.837 1.353 9.293 3.809l1.414-1.414C19.874 5.561 16.071 4 12 4a15.198 15.198 0 0 0-5.526 1.06zm-2.911 6.233 1.414 1.414a9.563 9.563 0 0 1 2.058-1.551L5.576 9.697c-.717.451-1.395.979-2.013 1.596zm2.766 3.014 1.414 1.414c.692-.692 1.535-1.151 2.429-1.428l-1.557-1.557a7.76 7.76 0 0 0-2.286 1.571zm7.66 3.803-2.1-2.1a1.996 1.996 0 1 0 2.1 2.1z"></path>
            </motion.svg>
            <p>Slower network or no internet conection...</p>
            <button onClick={() => navigate(`/product/${id}`)}>Refresh</button>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      {loadingProduct ? (
        <>
          <NavProducts className="extendsNavBar">
            <motion.p
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
              className="link-product__loading"
            />
          </NavProducts>
          <ContainerProduct>
            <div className="container-img__product">
              <motion.div
                className="img-product__loading"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{
                  duration: 1.8,
                  ease: "linear",
                  repeat: Infinity,
                }}
              />
            </div>
            <div className="container-details__product">
              <motion.h2
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{
                  duration: 1.8,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="title-product__loading"
              />
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{
                  duration: 1.8,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="category-product__loading"
              />
              <motion.p
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
                className="description-product__loading first-description"
              />
              <motion.p
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
                className="description-product__loading"
              />
              <motion.p
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
                className="description-product__loading"
              />
            </div>
          </ContainerProduct>
        </>
      ) : (
        <>
          <Width100 className="extendsNavBar">
            <NavProducts>
              <Link to="/" className="link-products">
                Home
              </Link>
              <p className="link-products">/</p>
              <Link to="/shop" className="link-products">
                Shop
              </Link>
              <p className="link-products">/</p>
              <Link to="/" className="link-products">
                {productSelected?.category}
              </Link>
              <p className="link-products">/</p>
              <p className="p-products">{productSelected?.name}</p>
            </NavProducts>
          </Width100>
          <ContainerProduct>
            <div className="container-img__product">
              <img src={hover} className="img-product__page" alt="" />
              <ContainerProductImg>
                {productSelected?.imgUrls.map((url, index) => (
                  <motion.div
                    key={url + index}
                    className="container-imgs__product"
                    whileHover={{ scale: 1.2, margin: "0 15px" }}
                    transition={{ ease: "linear", duration: 0.15 }}
                  >
                    <motion.img
                      whileHover={{ scale: 1.02, filter: "blur(0px)" }}
                      src={url}
                      alt="img-product"
                      onClick={() => setHover(url)}
                    />
                  </motion.div>
                ))}
              </ContainerProductImg>
            </div>
            <div className="container-details__product">
              <h2 className="title-product__page">{productSelected?.name}</h2>
              <div className="flex-row ">
                <ContainerStars>
                  {stars.map((_, index) => (
                    <motion.svg
                      key={index}
                      width="24"
                      height="24"
                      initial={{ fill: "#838383" }}
                      animate={
                        productSelected?.rating.ratingPorcentaje > index
                          ? { fill: "#f3cd21" }
                          : { fill: "#838383" }
                      }
                      transition={{ duration: 0.2, ease: "linear" }}
                    >
                      <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path>
                    </motion.svg>
                  ))}
                </ContainerStars>
                <p>
                  {"("}
                  <span>{productSelected?.rating.total}</span>
                  {")"} Reviews
                </p>
              </div>
              <div className="line-separation" />
              <p className="price-product__page">${productSelected?.price}</p>
              <div className="line-separation-short" />
              <div className="container-details__categorie">
                <p className="categorie_product">
                  <span>Categorie:</span> {productSelected?.category}
                </p>
                <p className="shipping-product">
                  {productSelected?.freeShipping === false
                    ? "Shipping cost: $15"
                    : "Free shipping"}
                </p>
              </div>
              <div className="line-separation-short" />

              <Quantity>
                <p>Quantity: </p>
                <div className="available-input">
                  <button
                    onClick={() => {
                      const input = document.getElementById("input-add-cart");
                      if (input.value <= 1) {
                        input.value = 1;
                      } else {
                        input.value = parseInt(input.value) - 1;
                      }
                    }}
                  >
                    -
                  </button>
                  <input type="number" id="input-add-cart" disabled value="1" />
                  <button
                    onClick={() => {
                      const input = document.getElementById("input-add-cart");

                      if (input.value >= productSelected.available) {
                        input.value = productSelected.available;
                      } else {
                        input.value = parseInt(input.value) + 1;
                      }
                    }}
                  >
                    +
                  </button>

                  <motion.svg
                    initial={{ fill: "#3d3d3d" }}
                    whileHover={{ scale: 1.2, fill: "#ec2626" }}
                    className="heart-product"
                  >
                    <path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path>
                  </motion.svg>
                </div>
              </Quantity>
              <ContainerInteraction>
                <button
                  className="buy-now__product"
                  onClick={() => {
                    setModalBuy(!modalBuy);
                  }}
                >
                  Buy now
                </button>
                <button
                  className="add-cart__product"
                  onClick={() => {
                    const input = document.getElementById("input-add-cart");
                    const inCart = cartItems.find(
                      (productsInCart) =>
                        productsInCart.id === productSelected.id
                    );
                    if (inCart) {
                      if (inCart.amountOnCart === productSelected.available) {
                        input.value = 1;
                      } else {
                        addToCartWithAmount(productSelected, input.value);
                      }
                    } else {
                      addToCartWithAmount(productSelected, input.value);
                    }
                  }}
                >
                  Add to cart
                </button>
              </ContainerInteraction>
            </div>
          </ContainerProduct>
          <ContainerProductDescriptionAndReviews>
            <div className="nav-container__product-description">
              <motion.h4
                onClick={() => setDescriptionAndReview("description")}
                animate={
                  descriptionAndReview === "description"
                    ? { color: "#ecb24c" }
                    : { color: "#444" }
                }
              >
                Description
              </motion.h4>
              <motion.h4
                onClick={() => setDescriptionAndReview("reviews")}
                animate={
                  descriptionAndReview === "reviews"
                    ? { color: "#ecb24c" }
                    : { color: "#444" }
                }
              >
                Reviews
              </motion.h4>
            </div>
            {descriptionAndReview === "description" ? (
              <div className="container-long__description">
                <hr />
                <p>{productSelected?.longDescription}</p>
                <hr />
              </div>
            ) : (
              <ContainerReviews
                productSelected={productSelected}
                stars={stars}
              />
            )}
          </ContainerProductDescriptionAndReviews>
          <RelatedProducts productSelected={productSelected} />
          <ModalBuyNow
            modalBuy={modalBuy}
            setModalBuy={setModalBuy}
            stars={stars}
            productSelected={productSelected}
            ContainerStars={ContainerStars}
            user={user}
          />
        </>
      )}
    </>
  );
};

export default Product;

const Width100 = styled.div`
  width: 100%;
  background-color: #f4f4f4;
  padding: 79px 0 17px;
`;

const NavProducts = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 79%;
  margin: auto;
  .link-products {
    text-decoration: none;
    color: inherit;
    font-size: 13px;
    margin: 0 4px;
    transition: 0.3s all;
    :hover {
      color: #727272;
    }
  }
  .p-products {
    color: #d49c24;
    font-size: 13px;
    font-weight: 500;
    margin: 0 0 0 4px;
  }
  .link-product__loading {
    width: 190px;
    height: 12px;
    background-color: #e9e9e9b5;
    margin: 0;
    margin-left: 20px;
  }
`;

const ContainerProduct = styled.div`
  width: 88%;
  margin: auto;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  justify-content: center;
  .container-img__product {
    width: 100%;
    margin: auto;
    img {
      display: block;
      width: 85%;
      height: 450px;
      margin: auto;
      object-fit: cover;
      padding: 40px 0 0 0;
    }
    .img-product__loading {
      width: 540px;
      height: 390px;
      margin: 30px 20px 0;
      background-color: #e9e9e9b5;
    }
  }
  .container-details__product {
    width: 80%;
    margin-top: 50px;
    .flex-row {
      margin: 10px 0 10px;
      display: flex;
      align-items: center;
      p {
        span {
          font-weight: 600;
          color: #444;
          font-size: 14px;
          margin: 0 2px;
        }
      }
    }
    .title-product__loading {
      width: 150px;
      height: 16px;
      background-color: #e9e9e9b5;
    }
    .title-product__page {
      font-size: 24px;
    }
    .category-product__loading {
      width: 180px;
      height: 10px;
      background-color: #e9e9e9b5;
      margin-top: 10px;
      margin-bottom: 30px;
    }
    .description-product__loading {
      width: 100%;
      height: 50px;
      background-color: #e9e9e9b5;
      margin: 8px 0;
    }
    .description-product__page {
      font-size: 15px;
    }
    .price-product__page {
      font-size: 26px;
      font-weight: 600;
      color: #444;
    }
    .container-details__categorie {
      .categorie_product {
        font-size: 13px;
        margin-bottom: 4px;
        span {
          font-weight: 700;
          font-size: 13.5px;
          color: #444;
        }
      }
      .shipping-product {
        font-weight: 500;
        margin-bottom: 10px;
        font-size: 13.5px;
        color: #e4b023;
      }
    }
  }
`;

const ContainerProductImg = styled.div`
  width: 98%;
  display: flex;
  justify-content: center;
  margin-top: 15px;
  .container-imgs__product {
    width: 120px;
    height: 80px;
    margin: 0 6px;
    border-radius: 2px;
    img {
      width: 100%;
      filter: blur(0.6px);
      cursor: pointer;
      padding: 0;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const ContainerInteraction = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 24px;
  .add-cart__product {
    border: none;
    padding: 6px 16px;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 500;
    border-radius: 2px;
    background-color: #fcfcfc;
    border: 2px solid #ecb24c;
    color: #444;
    margin-right: 25px;
    transition: 0.3s all;
  }
  .buy-now__product {
    border: none;
    border-radius: 2px;
    padding: 8px 27px;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 500;
    background-color: #ecb24c;
    color: #ffffff;
    margin-right: 25px;
    transition: 0.3s all;
    :hover {
      background-color: #cf9531;
    }
  }
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  p {
    margin: 0;
    font-weight: 500;
    color: #444;
  }
  .available-input {
    display: flex;
    align-items: center;
    margin-left: 10px;
    input {
      width: 28px;
      height: 27px;
      border: 1px solid #ececec;
      border-left: none;
      border-right: none;
      border-radius: 0px;
      background-color: #fafafa;
      padding: 0;
      text-align: center;
      font-size: 13px;
      :focus {
        outline: none;
      }
    }
    button {
      width: 24px;
      height: 27px;
      border: 1px solid #ececec;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 1px;
      font-size: 15px;
      font-weight: 600;
      line-height: 1;
      color: #666;
      background-color: #f9f9f9;
    }
  }

  .heart-product {
    width: 24px;
    height: 24px;
    margin-left: 70px;
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const ContainerStars = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  svg {
    transform: scale(0.8);
  }
`;

const ContainerProductDescriptionAndReviews = styled.div`
  width: 100%;
  margin: 10px auto 50px;
  .nav-container__product-description {
    display: flex;
    justify-content: center;
    align-items: center;
    h4 {
      font-size: 18px;
      margin: 0 10px 15px 0;
      font-weight: 600;
      cursor: pointer;
    }
  }

  .container-long__description {
    width: 90%;
    margin: auto;
    p {
      width: 90%;
      text-align: center;
      margin: 20px auto;
    }
    hr {
      margin: 0;
    }
  }
`;
