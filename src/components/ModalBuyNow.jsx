import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useProducts } from "../admin/context/productsContext";

const ModalBuyNow = ({
  modalBuy,
  setModalBuy,
  stars,
  productSelected,
  user,
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const { sendReviewsForProduct, ratingStars, getListOfOneProduct } =
    useProducts();

  const sendTotalReviews = async (id) => {
    const starPorcentaje = [];
    let sum = 0;
    getListOfOneProduct(id).then(async (product) => {
      product.reviews.map((review, i) => {
        starPorcentaje.push(review.starReview);
      });
      const totalStars = starPorcentaje.length;
      for (let i = 0; i < totalStars; i++) {
        sum += starPorcentaje[i];
      }
      const porcentajeStarRounded = Math.round(sum / totalStars);
      console.log(porcentajeStarRounded);
      await ratingStars(porcentajeStarRounded, id, totalStars);
    });
  };

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  return (
    <motion.div
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={
        modalBuy === true
          ? { opacity: 1, pointerEvents: "auto", }
          : { opacity: 0, pointerEvents: "none" }
      }
    >
      <Overlay onClick={() => setModalBuy(!modalBuy)}>
        <ContainerModal
          modalBuy={modalBuy}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div className="wrapper">
            {" "}
            <motion.svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <motion.circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <motion.path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </motion.svg>
          </motion.div>
          <motion.h3
            animate={
              modalBuy === true
                ? { opacity: 1, translateY: [-20, 15] }
                : {
                    opacity: 0,
                    transition: {
                      duration: 0,
                      delay: 0,
                    },
                  }
            }
            transition={{ duration: 0.5, delay: 1 }}
          >
            Thanks for your purchase.
          </motion.h3>

          <motion.div
            className="form-reviews"
            initial={{ opacity: 0,  }}
            animate={
              modalBuy === true
                ? { opacity: 1, y: [-50, 0],  }
                : {
                    opacity: 0,
                    transition: {
                      duration: 0,
                      delay: 0,
                    },
                  }
            }
            transition={{ delay: 1.5, duration: 1 }}
          >
            <p>Write a review</p>
            <p>Score:</p>
            <ContainerStars>
              {stars.map((_, index) => (
                <motion.svg
                  key={index}
                  onClick={() => handleClick(index + 1)}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  onMouseLeave={handleMouseLeave}
                  width="24"
                  height="24"
                  initial={{ fill: "#838383" }}
                  animate={
                    (hoverValue || currentValue) > index
                      ? { fill: "#f3cd21", cursor: "pointer" }
                      : { fill: "#838383" }
                  }
                  transition={{ duration: 0.2, ease: "linear" }}
                >
                  <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path>
                </motion.svg>
              ))}
            </ContainerStars>
            <p>Review:</p>
            <textarea name="review" id="review-input"></textarea>
            <div className="container-btn__review">
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "#c40000" }}
                onClick={() => setModalBuy(!modalBuy)}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "#00a323" }}
                onClick={async () => {
                  const review = document.getElementById("review-input").value;
                  const score = currentValue;
                  const reviews = {
                    city: user?.city || "New York",
                    email: user?.email,
                    name: user?.displayName,
                    photoUrl: user?.photoURL,
                    starReview: score,
                    review: review,
                  };
                  sendReviewsForProduct(productSelected.id, reviews).then(
                    async () => {
                      await sendTotalReviews(productSelected.id);
                      setModalBuy(!modalBuy);
                    }
                  );
                }}
              >
                Send
              </motion.button>
            </div>
          </motion.div>
        </ContainerModal>
      </Overlay>
    </motion.div>
  );
};

export default ModalBuyNow;

const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.39);
`;
const ContainerModal = styled.div`
  width: 700px;
  background-color: #fdfdfd;
  border-radius: 5px;
  margin-bottom: 30px;
  padding: 30px;
  .wrapper {
    display: flex;
    justify-content: center;
    .checkmark {
      width: 65px;
      height: 65px;
      border-radius: 50%;
      display: block;
      stroke-width: 2.3;
      stroke: #38b357;
      stroke-miterlimit: 1;
      animation: ${(props) =>
        props.modalBuy && "scale 0.3s ease-in-out 0.7s both"};
    }
    .checkmark__circle {
      stroke-dasharray: 200;
      stroke-dashoffset: 200;
      stroke-width: 2.5;
      stroke: #38b357;
      fill: none;
      animation: ${(props) =>
        props.modalBuy && "stroke 0.6s cubic-bezier(0.65, 0, 1, 1) forwards"};
    }
    .checkmark__check {
      transform-origin: 50% 50%;
      stroke-dasharray: 48;
      stroke-dashoffset: 48;
      animation: ${(props) =>
        props.modalBuy &&
        "stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards"};
    }
  }
  h3 {
    text-align: center;
    opacity: 0;
    color: #0cb130;
    font-weight: 500;
  }
  .form-reviews {
    width: 100%;
    margin-top: 35px;
    p {
      margin: 0;
      color: #1b1b1b;
    }
    #review-input {
      width: 100%;
      height: 140px;
      resize: none;
      margin-top: 3px;
      border-radius: 5px;
      border: 1px solid #afafaf;
      padding: 3px;
      font-size: 13px;
      :focus {
        outline: none;
      }
    }
    .container-btn__review {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      button {
        width: 100px;
        border-radius: 4px;
        background-color: #c21b1b;
        font-size: 12px;
        font-weight: 500;
        color: #f1f1f1;
        text-transform: uppercase;
        margin: 0 10px;
        height: 30px;
        border: none;
        :last-child {
          background-color: #0cb130;
        }
      }
    }
  }
`;

const ContainerStars = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 10px;
  svg {
    transform: scale(0.9);
  }
`;
