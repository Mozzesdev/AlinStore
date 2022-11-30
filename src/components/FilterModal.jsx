import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const FilterModal = ({
  setFilterModal,
  filterModal,
  updateFetchingApiCategories,
  categories,
  setCategorieSelected,
  categorieSelected,
}) => {
  const [subCategorySelected, setSubCategorySelected] = useState("");
  const [valuePriceRange, setValuePriceRange] = useState("");
  const [valuePriceRange2, setValuePriceRange2] = useState("");
  const [colorSelected, setColorSelected] = useState("");

  let priceGap = 10;

  const colors = [
    "#ebcbcc",
    "#cc6a0d",
    "#f6ebcd",
    "#f4f5cd",
    "#ecf5e0",
    "#e1f5f6",
    "#d6e4ef",
    "#e5ddf2",
    "#f6e3f7",
  ];

  useEffect(() => {
    setValuePriceRange(document.querySelector(".range-min").value);
    setValuePriceRange2(document.querySelector(".range-max").value);
  }, []);

  return (
    <Overlay
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={
        filterModal === true
          ? { opacity: 1, pointerEvents: "auto" }
          : { opacity: 0, pointerEvents: "none", transition: { duration: 1 } }
      }
      onClick={() => setFilterModal(!filterModal)}
    >
      <motion.div
        animate={filterModal === true ? { x: [-500, 0] } : { x: [0, -500] }}
        className="filter-container"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Categories</h3>
        <div className="categories-map">
          {categories.map((category, index) => {
            return (
              <div key={index}>
                <motion.p
                  whileHover={{ scale: 1.02, marginLeft: 5 }}
                  animate={
                    categorieSelected === category.name && {
                      scale: 1.02,
                      marginLeft: 5,
                    }
                  }
                  onClick={() => {
                    setCategorieSelected([
                      ...categorieSelected,
                      { name: category.name },
                    ]);
                    if (
                      categorieSelected.find((e) => e.name === category.name)
                    ) {
                      setCategorieSelected(
                        categorieSelected.filter(
                          (e) => e.name !== category.name
                        )
                      );
                    }
                  }}
                >
                  {category.name}
                </motion.p>
                <motion.ul
                  initial={{ height: 0, maxHeight: 200 }}
                  animate={{
                    height: categorieSelected.find(
                      (e) => e.name === category.name
                    )
                      ? "auto"
                      : 0,
                  }}
                  className="categories-filter"
                >
                  <motion.li
                    onClick={() => {
                      setSubCategorySelected("All");
                    }}
                    initial={{ textDecoration: "none" }}
                    animate={
                      subCategorySelected === "All"
                        ? { textDecoration: "underline" }
                        : { textDecoration: "none" }
                    }
                    className="li-subcategory"
                  >
                    All <span>{category.total}</span>
                  </motion.li>
                  {category.subCategories.map((subcategory, index) => {
                    return (
                      <motion.li
                        key={index}
                        className="li-subcategory"
                        onClick={() => {
                          setSubCategorySelected(subcategory.name);
                        }}
                        initial={{ textDecoration: "none" }}
                        animate={
                          subCategorySelected === subcategory.name
                            ? { textDecoration: "underline" }
                            : { textDecoration: "none" }
                        }
                      >
                        {subcategory.name} <span>{subcategory.items}</span>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>
            );
          })}
          <p onClick={() => setCategorieSelected([])}>All</p>
        </div>
        <h3 className="filter-title">Filter By</h3>
        <p className="price-subtitle">Price</p>
        <div className="slider">
          <div className="progress"></div>
        </div>
        <div className="range-input">
          <input
            type="range"
            className="range-min"
            min="0"
            max="100"
            defaultValue="0"
            step="5"
            onChange={(e) => {
              const range = document.querySelector(".slider .progress");
              let minValue = parseInt(e.target.value);
              if (valuePriceRange2 - minValue < priceGap) {
                e.target.value = valuePriceRange2 - priceGap;
                range.style.left = (e.target.value / e.target.max) * 100 + "%";
              } else {
                setValuePriceRange(minValue);
                range.style.left = (minValue / e.target.max) * 100 + "%";

                if (categorieSelected.find((e) => e.prices === "prices")) {
                  setCategorieSelected(
                    categorieSelected.map((e) => {
                      e.priceMin = minValue;
                      e.priceMax = parseInt(valuePriceRange2);
                    })
                  );
                } else {
                  setCategorieSelected([
                    ...categorieSelected,
                    {
                      prices: "prices",
                      priceMin: minValue,
                      priceMax: parseInt(valuePriceRange2),
                    },
                  ]);
                }
              }
            }}
          />
          <input
            type="range"
            className="range-max"
            min="0"
            max="100"
            defaultValue="20"
            step="5"
            onChange={(e) => {
              const range = document.querySelector(".slider .progress");
              const rangeMin = document.querySelector(".range-min").value;
              let maxValue = parseInt(e.target.value);
              let minValue = parseInt(rangeMin);
              if (maxValue - minValue < priceGap) {
                const newValue = minValue + priceGap;
                e.target.value = newValue;
                setValuePriceRange2(e.target.value);
                range.style.right =
                  100 - (e.target.value / e.target.max) * 100 + "%";
              } else {
                setValuePriceRange2(e.target.value);
                range.style.right =
                  100 - (e.target.value / e.target.max) * 100 + "%";
                if (categorieSelected.find((e) => e.prices === "prices")) {
                  setCategorieSelected(
                    categorieSelected.map((e) => {
                      e.priceMin = minValue;
                      e.priceMax = parseInt(valuePriceRange2);
                    })
                  );
                } else {
                  setCategorieSelected([
                    ...categorieSelected,
                    {
                      prices: "prices",
                      priceMin: minValue,
                      priceMax: parseInt(valuePriceRange2),
                    },
                  ]);
                }
              }
            }}
          />
        </div>
        <div className="field">
          <p>
            Range: <span>$</span>
            {valuePriceRange}.00 - <span>$</span>
            {valuePriceRange2}.00
          </p>
        </div>
        <ContainerColor>
          <p>Color</p>
          <div className="container-colors">
            {colors.map((color, i) => (
              <RadiusColor
                initial={{ opacity: 0.7 }}
                key={i}
                whileHover={{ scale: 1.14, opacity: 1 }}
                animate={
                  colorSelected === color
                    ? { scale: 1.14, opacity: 1 }
                    : { opacity: 0.7, scale: 1 }
                }
                onClick={() => {
                  if (colorSelected === color) {
                    setColorSelected("");
                  } else {
                    setColorSelected(color);
                  }
                }}
                color={color}
                className="color-item"
              >
                <motion.svg
                  initial={{ opacity: 0, fill: "#292929" }}
                  animate={
                    colorSelected === color ? { opacity: 1 } : { opacity: 0 }
                  }
                  width="24"
                  height="24"
                >
                  <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
                </motion.svg>
              </RadiusColor>
            ))}
          </div>
        </ContainerColor>
      </motion.div>
    </Overlay>
  );
};

export default FilterModal;

const Overlay = styled(motion.div)`
  position: fixed;
  overflow: hidden;
  top: 0;
  background-color: rgba(2, 2, 2, 0.13);
  z-index: 100;
  width: 100%;
  height: 100vh;
  .filter-container {
    background-color: #fdfdfd;
    width: 300px;
    height: 100vh;
    padding: 20px;
    overflow: hidden;
    h3 {
      font-size: 23px;
      font-weight: 700;
    }
  }
  .categories-map {
    margin-top: 20px;
    margin-left: 3px;
    p {
      margin: 0;
      font-weight: 600;
      color: #000;
      font-size: 13px;
      line-height: 1.2;
      text-transform: uppercase;
      cursor: pointer;
    }
    .categories-filter {
      padding-left: 15px;
      overflow: hidden;
      li {
        width: 75%;
        font-size: 12px;
        list-style: none;
        display: flex;
        margin: 3px 0;
        justify-content: space-between;
        cursor: pointer;
      }
    }
  }
  .slider {
    width: 200px;
    height: 2px;
    position: relative;
    background: #ddd;
    .progress {
      height: 100%;
      left: 0%;
      right: 80%;
      position: absolute;
      border-radius: 5px;
      background: #e4a700;
    }
  }
  .range-input {
    position: relative;
    input {
      position: absolute;
      width: 200px;
      height: 6px;
      top: -5px;
      background: none;
      pointer-events: none;
      -webkit-appearance: none;
    }
  }
  .field {
    display: flex;
    align-items: center;
    margin-top: 10px;
    p {
      font-size: 12px;
      margin: 0;
      color: #222222;
      font-weight: 500;
      span {
        font-weight: 600;
      }
    }
    input {
      display: block;
      border: none;
      margin: 0 5px;
      width: 20px;
      font-size: 13px;
    }
  }
  .filter-title {
    margin-top: 50px;
  }
  .price-subtitle {
    margin-top: 20px;
    text-transform: uppercase;
    font-size: 13px;
    color: #000;
    font-weight: 600;
  }
`;

const ContainerColor = styled.div`
  margin-top: 29px;
  p {
    margin-bottom: 12px;
    color: #000;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 13px;
    margin-left: 3px;
  }
  .container-colors {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
  }
`;

const RadiusColor = styled(motion.div)`
  width: 23px;
  height: 23px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.205);
  margin: 5px 5px;
  svg {
    fill: #2c2c2c;
    transform: scale(0.7);
    margin-bottom: 1px;
    margin-right: 1px;
  }
`;
