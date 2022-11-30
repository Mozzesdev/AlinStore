import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import Slideshow from "../components/Slideshow";
import newArrival from "../img/32.png";
import ar from "../img/arrowright.svg";
import lf from "../img/arrowleft.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useProducts } from "../admin/context/productsContext";
AOS.init();

function Home() {
  const { updateFetchingApi, allProducts } = useProducts();

  const navigate = useNavigate();

  useEffect(() => {
    updateFetchingApi();
  }, []);

  useEffect(() => {
    document.title = "Home - AlinDesign";
  }, []);

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        style={{
          position: "absolute",
          right: "0",
          top: "-30px",
          height: "100%",
          zIndex: "100",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          transform: "translate(100%, 0)",
        }}
      >
        <img
          src={ar}
          alt=""
          style={{ width: "34px", cursor: "pointer" }}
          onClick={onClick}
        />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        style={{
          position: "absolute",
          left: "0",
          top: "-30px",
          height: "100%",
          zIndex: "100",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          transform: "translate(-100%, 0)",
        }}
      >
        <img
          src={lf}
          alt=""
          style={{ width: "34px", cursor: "pointer" }}
          onClick={onClick}
        />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <Slideshow />
      <MainText>
        <h3>Fashion Collections</h3>
        <h2>
          <b></b>
          <span>Featured Categories</span>
          <b></b>
        </h2>
        <p>Newest trends from to brands</p>
      </MainText>
      <MainSection>
        <FirstDivOfSection>
          <div className="featureImg3 featureImgTol">
            <p>Dress</p>
          </div>
          <div className="featureImg4 featureImgTol">
            <p>Accesories</p>
          </div>
        </FirstDivOfSection>
        <SecondDivOfSection>
          <div className="featureImg1 featureImgTol2">
            <p>Clothes</p>
          </div>
          <div className="featureImg2 featureImgTol2">
            <p>Handlers</p>
          </div>
        </SecondDivOfSection>
      </MainSection>

      <ContBotonShop>
        <Link to="/shop" className="botonShop">
          Shop
        </Link>
      </ContBotonShop>

      <NewArrival className="img-newarrivals">
        <NewArrivalText className="newarrivals-text">
          <h4>#newarrivals</h4>
          <p>e-commerce fashion site</p>
          <Link to="/shop" className="shop-now">
            shop now
          </Link>
        </NewArrivalText>
      </NewArrival>

      <MainText>
        <h3>Fashion Collections</h3>
        <h2>
          <b></b>
          <span>Featured Products</span>
          <b></b>
        </h2>
        <p>Newest trends from to brands</p>
      </MainText>

      <LatestProducts>
        <Slider {...settings}>
          {allProducts &&
            allProducts.slice(0, 5).map((product, i) => {
              return (
                <DivLatestProducts key={product.id}>
                  <img
                    src={product.imgUrls[0]}
                    alt=""
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                  <LatestText>
                    <h4>{product.name}</h4>
                    <p>{product.shortDescription}</p>
                    <p>${product.price}</p>
                  </LatestText>
                </DivLatestProducts>
              );
            })}
        </Slider>
      </LatestProducts>

      <MainText>
        <h3>Fashion Collections</h3>
        <h2>
          <b></b>
          <span>Que nos destaca?</span>
          <b></b>
        </h2>
        <p>Newest trends from to brands</p>
      </MainText>
      <AboutUs>
        <div>
          <h3>Social</h3>
          <p>
            Creemos que es importante que todos puedan participar en nuestra
            sociedad. ¿Sabía que si tiene una buena educación, ha vivido en los
            Países Bajos durante varios años, pero no domina muy bien el idioma
            holandés, sus oportunidades de empleo son bastante pequeñas? Es por
            eso que elegimos capacitar a mujeres de diferentes orígenes como
            costureras profesionales. Esto les da la oportunidad de trabajar
            para Atelier Revive y pueden participar en nuestra sociedad.
          </p>
        </div>
        <div className="second">
          <h3>Reciclado</h3>
          <p>
            Solo utilizamos materiales desechados para nuestros productos. Como
            telas y cintas que ya no se usan. Tenemos nuestras etiquetas hechas
            de hilo reciclado. Damos a los materiales sobrantes o destinados al
            contenedor un nuevo destino en hermosos productos reutilizables.
            Incluso recogemos todos los restos de tela que quedan tras la
            elaboración de nuestros productos. También estamos buscando un buen
            destino para estas sobras.
          </p>
        </div>
        <div>
          <h3>Reutilizable</h3>
          <p>
            Creemos que la reutilización es muy normal. Es por eso que los
            productos que fabricamos son de buena calidad y están diseñados y
            fabricados para durar mucho tiempo. <br />
            ¿Se va a romper algo? ¡Háganos saber que tenemos un servicio de
            reparación !
          </p>
        </div>
      </AboutUs>

      <ContBotonShop>
        <Link to="/about-us" className="botonShop">
          Leer más
        </Link>
      </ContBotonShop>
    </>
  );
}

export default Home;

const NewArrival = styled.div`
  height: 380px;
  background-position: center 10%;
  margin: 7rem 0;
  position: relative;
  background-image: url(${newArrival});
`;

const NewArrivalText = styled.div`
  position: absolute;
  text-align: center;
  left: 160px;
  top: 120px;
  h4 {
    display: inline-block;
    background-color: rgb(26, 26, 26);
    line-height: 1;
    padding: 9px 9px;
    font-size: 30px;
    letter-spacing: 1px;
    color: white;
  }
  p {
    margin-top: 8px;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 10px;
  }
  .shop-now {
    color: black;
    font-weight: bold;
    font-size: 24px;
    text-decoration: none;
    display: inline-block;
    margin-top: 20px;
    border-bottom: 3px solid black;
  }
`;

const MainText = styled.div`
  text-align: center;
  line-height: 1;
  margin: 40px auto;
  width: 85%;
  h3 {
    font-size: 16px;
    color: #b48888;
    font-weight: 500;
    text-transform: uppercase;
  }
  h2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 27px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin: 0 15px;
    }
    b {
      display: block;
      flex: 1;
      height: 2px;
      opacity: 0.1;
      background-color: #000;
    }
  }
  p {
    font-size: 14px;
    color: #5a5a5a;
  }
`;

const MainSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: 20px auto;
  width: 90%;
  height: 450px;
  gap: 20px;
  justify-content: center;
`;

const FirstDivOfSection = styled.div``;
const SecondDivOfSection = styled.div``;

const ContBotonShop = styled.div`
  width: 70%;
  padding: 20px 0 0;
  margin: 40px auto;
  text-align: center;
  .botonShop {
    border: 2px solid #000;
    padding: 6px 19px;
    border-radius: 14px;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    text-decoration: none;
    color: #000;
    :hover {
      background-color: #000;
      color: #fff;
    }
  }
`;

const AboutUs = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  gap: 20px;
  width: 80%;
  margin: 30px auto;
  .second {
    border-right: 1px solid rgba(192, 192, 192, 0.5);
    border-left: 1px solid rgba(192, 192, 192, 0.5);
    padding: 0 15px;
  }
  h3 {
    color: rgb(80, 80, 80);
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  p {
    font-size: 15px;
    line-height: 1.7;
  }
`;

const LatestProducts = styled.section`
  width: 85%;
  margin: 0 auto;
  padding: 0 0 50px;
`;
const DivLatestProducts = styled.div`
  img {
    margin: 0 auto;
    object-fit: cover;
    width: 270px;
    height: 300px;
    cursor: pointer;
  }
`;

const LatestText = styled.div`
  padding: 10px 0;
  text-align: center;
  h4 {
    font-size: 14px;
    opacity: 0.7;
  }
  p {
    color: #000;
    font-size: 14px;
    :last-child {
      color: #b31a15;
      font-weight: 600;
    }
  }
`;
