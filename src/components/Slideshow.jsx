import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import firstImg from "../img/5.webp";
import secundImg from "../img/2.webp";
import threeImg from "../img/4.webp";

export default function Slideshow() {
  const headerImgs = [
    {
      img: firstImg,
    },
    {
      img: secundImg,
    },
    {
      img: threeImg,
    },
  ];

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        style={{
          position: "absolute",
          right: "40px",
          top: "0",
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
          width="40"
          height="40"
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
          left: "40px",
          top: "0",
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
          width="40"
          height="40"
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <ContainerSlideShow>
        <Slider {...settings}>
          {headerImgs.map((img, index) => (
            <ContainerMap key={index} img={img.img} />
          ))}
        </Slider>
      </ContainerSlideShow>
    </>
  );
}

const ContainerSlideShow = styled.div`
  width: 100%;
  height: 490px;
  margin-bottom: 60px;
  .slick-dots {
    bottom: 20px !important;
    li {
      width: 20px !important;
      height: 20px !important;
      button {
        ::before {
          width: 20px !important;
          font-size: 10px;
          height: 20px !important;
          opacity: 0.7;
        }
      }
    }
    .slick-active {
      button {
        ::before {
          opacity: 1;
        }
      }
    }
  }
`;

const ContainerMap = styled.div`
  background-image: ${(props) => `url(${props.img})`};
  width: 100%;
  height: 490px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 10%;
`;
