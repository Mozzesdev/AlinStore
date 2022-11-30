import React, { useEffect, useState } from "react";
import equalizer from "../img/equalizer.png";
import ResultadoShop from "./ContenidoShop/ResultadoShop";
import styled from "styled-components";
import { useProducts } from "../admin/context/productsContext";
import FilterModal from "../components/FilterModal";

export default function Shop() {
  const [selectOrderState, setSelectOrderState] = useState();
  const [filterModal, setFilterModal] = useState(false);
  const [categorieSelected, setCategorieSelected] = useState([]);

  const {
    updateFetchingApi,
    allProducts,
    updateFetchingApiCategories,
    categories,
  } = useProducts();

  useEffect(() => {
    document.title = "Shop - AlinDesign";
  }, []);

  useEffect(() => {
    updateFetchingApiCategories();
    updateFetchingApi();
  }, []);

  const handleChange = (e) => {
    const value = e?.target.value;
    setSelectOrderState(value);
  };

  const newArray = allProducts?.filter((product, i) => {
    if (categorieSelected.length === 0) {
      return product;
    } else if (categorieSelected.find((e) => e.prices === "prices")) {
      return (
        product.prices <= categorieSelected.find((e) => e.prices).priceMin &&
        product.prices >= categorieSelected.find((e) => e.prices).priceMax
      );
    } else {
      return categorieSelected
        .map((e) => {
          return e.name;
        })
        .find((e) => e === product.category);
    }
  });

  console.log(newArray);
  console.log(categorieSelected);

  return (
    <>
      {allProducts?.length > 0 ? (
        <>
          <FilterModal
            setFilterModal={setFilterModal}
            filterModal={filterModal}
            categories={categories}
            updateFetchingApiCategories={updateFetchingApiCategories}
            categorieSelected={categorieSelected}
            setCategorieSelected={setCategorieSelected}
          />
          <ContenedorShopPrincipal className="extendsNavBar">
            <ContenedorShopFiltro>
              <h2>Shop</h2>
              <p>
                <a href="!#">
                  <span>Home</span>
                </a>{" "}
                / Shop
              </p>
              <ContenedorShopFiltroLogo
                onClick={() => setFilterModal(!filterModal)}
              >
                <img src={equalizer} alt="" />
                <p>Filter</p>
              </ContenedorShopFiltroLogo>
            </ContenedorShopFiltro>
            <ContenedorShopInfoResultado>
              <p style={{ color: "#777" }}>
                Showing {allProducts.length} results
              </p>
              <select name="order-shop" id="order-shop" onChange={handleChange}>
                <option value="Most Recent">Ordenar por mas recientes</option>
                <option value="Most Popular">Ordenar por mas populares</option>
                <option value="Low to High">Ordenar por: Low to High</option>
                <option value="High to Low">Ordenar por: High to Low</option>
              </select>
            </ContenedorShopInfoResultado>
          </ContenedorShopPrincipal>
          <ResultadoShop
            selectOrderState={selectOrderState}
            allProducts={newArray}
          />
        </>
      ) : (
        <>
          <div className="extendsNavBar">
            <h2>Hola</h2>
          </div>
        </>
      )}
    </>
  );
}

const ContenedorShopPrincipal = styled.section`
  width: 76%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;

  p {
    margin: 0;
  }
  h2 {
    margin-bottom: 13px;
    font-size: 25px;
  }
`;

const ContenedorShopFiltro = styled.div`
  p {
    font-size: 12px;
    margin-bottom: 7px;
  }
  a {
    color: #000;
    text-decoration: none;
    span {
      color: rgba(102, 102, 102, 0.7);
    }
    span:hover {
      color: #000;
    }
  }
`;

const ContenedorShopFiltroLogo = styled.div`
  display: flex;
  align-items: center;
  width: 70px;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  p {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
    margin: 0;
  }
`;

const ContenedorShopInfoResultado = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  select {
    margin-left: 10px;
    font-size: 14px;
    padding: 6px 28px 6px 10px;
    border: none;
    border-radius: 3px;
    color: #303030;
    background-color: #ffffffcf;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.17);
    cursor: pointer;

    &:focus {
      outline: none;
    }

    option {
      font-size: 14px;
    }
  }
`;
