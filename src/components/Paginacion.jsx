/* eslint-disable eqeqeq */
import React from "react";
import style from "styled-components";
import arrowLeft from "../img/arrowleft.svg";
import arrowRight from "../img/arrowright.svg";

const Paginacion = ({ pagina, setPagina, maximo }) => {
  const nextPage = () => {
    if (pagina >= maximo) {
      setPagina(maximo);
    } else {
      setPagina(pagina + 1);
    }
  };

  const previousPage = () => {
    if (pagina <= 1) {
      setPagina(1);
    } else {
      setPagina(pagina - 1);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };
  return (
    <>
      <ContainerPag>
        {pagina <= 1 ? (
          <></>
        ) : (
          <button
            onClick={() => {
              previousPage();
              scrollToTop();
            }}
          >
            <img src={arrowLeft} alt="" />
          </button>
        )}
        <p
          onClick={() => {
            setPagina(1);
            scrollToTop();
          }}
          className={pagina == 1 ? "selectPage" : "unSelected"}
        >
          {pagina == 1 ? pagina : "1"}
        </p>
        {maximo == 2 && (
          <p
            className={pagina == 2 ? "selectPage" : "unSelected"}
            onClick={() => {
              setPagina(2);
              scrollToTop();
            }}
          >
            {pagina == 2 ? pagina : "2"}
          </p>
        )}
        {maximo > 1 && (
          <button
            onClick={() => {
              nextPage();
              scrollToTop();
            }}
          >
            <img src={arrowRight} alt="" />
          </button>
        )}
      </ContainerPag>
    </>
  );
};

export default Paginacion;

const ContainerPag = style.div`
 width: 80%;
 margin: 0 auto 40px;
 display: flex;
 justify-content: center;
 align-items: center;
 button{
  border: none;
  background-color: transparent;
  img{
   width: 32px;
  }
 }
 .selectPage{
  font-size: 13px;
  background-color: #10182f;
  color: #fff;
  border: 1px solid #10182f;
  border-radius: 5px;
  padding: 8px 12px;
  line-height: 1;
  margin: 1px 5px;
  cursor: pointer;
 }
 .unSelected{
  font-size: 13px;
  background-color: #fdfdfd;
  color: #383838;
  border: 1px solid #19234157;
  border-radius: 5px;
  padding: 8px 12px;
  line-height: 1;
  cursor: pointer;
  margin: 1px 5px;
 }
`;
