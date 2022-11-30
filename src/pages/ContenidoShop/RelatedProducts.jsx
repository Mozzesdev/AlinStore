import React, { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useProducts } from "../../admin/context/productsContext";
import Slider from "react-slick";

const RelatedProducts = ({ productSelected }) => {
  const { updateFetchingApi, allProducts } = useProducts();

  useEffect(() => {
    updateFetchingApi();
  }, []);

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        style={{
          position: "absolute",
          right: "10px",
          top: "-30px",
          height: "100%",
          zIndex: "100",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          transform: "translate(100%, 0)",
        }}
      >
        <svg
          onClick={onClick}
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          style={{
            cursor: "pointer",
          }}
        >
          <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
        </svg>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        style={{
          position: "absolute",
          left: "10px",
          top: "-20px",
          height: "100%",
          zIndex: "100",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          transform: "translate(-100%, 0)",
        }}
      >
        <svg
          onClick={onClick}
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          style={{
            cursor: "pointer",
          }}
        >
          <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
        </svg>
      </div>
    );
  }

  const numCategory = allProducts.filter(
    (product) =>
      product?.category === productSelected?.category &&
      product?.id !== productSelected?.id
  );

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow:
      (numCategory.length === 2 && 2) ||
      (numCategory.length === 1 && 1) ||
      (numCategory.length >= 3 && 3),
    infinite: true,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  return (
    <>
      <ContainerComponent>
        <h2 className="title-related__products">Related Products</h2>
        <div className="slideshow-products__related">
          <Slider {...settings}>
            {numCategory.map((product, index) => {
              return (
                <div key={index} className="div-slideshow">
                  <img alt="" src={product.imgUrls[0]} />
                  <div className="div-details__products">
                    <h4>{product?.name}</h4>
                    <p>{product.shortDescription}</p>
                    <p>${product.price}</p>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </ContainerComponent>
    </>
  );
};

export default RelatedProducts;

const ContainerComponent = styled.div`
  width: 85%;
  margin: auto;
  .title-related__products {
    text-align: center;
  }
  .slideshow-products__related {
    width: 85%;
    margin: 20px auto 40px;
    .div-slideshow {
      padding: 0 20px;
      img {
        margin: 0 auto;
        object-fit: cover;
        width: 260px;
        height: 250px;
      }
      .div-details__products {
        width: 260px;
        margin: auto;
      }
    }
  }
`;
