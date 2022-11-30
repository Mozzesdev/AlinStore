/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useProducts } from "../context/productsContext";

const ModalInfo = ({
  estado,
  cambiarEstado,
  showInfoData,
  setShowInfoData,
  updateFetchingApi,
}) => {
  const { deleteTheProduct, loadingProduct, addStock, removeStock } =
    useProducts();

  const addStockInfo = async () => {
    await setShowInfoData({
      ...showInfoData,
      available: parseInt(showInfoData.available) + 1,
    });

    await addStock(parseInt(showInfoData.available), showInfoData.id);
    updateFetchingApi();
  };

  const removeStockInfo = async () => {
    await setShowInfoData({
      ...showInfoData,
      available: parseInt(showInfoData.available) - 1,
    });

    await removeStock(parseInt(showInfoData.available), showInfoData.id);
    updateFetchingApi();
  };
  return (
    <>
      {estado && (
        <Overlay onClick={() => cambiarEstado(false)}>
          <ContainerModal onClick={(e) => e.stopPropagation()}>
            <ContainerImg>
              <img src={showInfoData.imgUrls[0]} alt="" />
            </ContainerImg>
            <ContainerInfo>
              <div>
                <h2>
                  {showInfoData.name} - {showInfoData.category}
                </h2>
                <div className="line-div" />
                <p className="price-modal">${showInfoData.price}</p>
                <p className="long-description__modal">
                  {showInfoData.longDescription}
                </p>
                <p className="products-available">
                  {showInfoData.available} en stock
                </p>
                <ContainerButtoms>
                  <div className="available-input">
                    <button
                      onClick={async () => {
                        if (parseInt(showInfoData.available) <= 0) {
                          setShowInfoData({
                            ...showInfoData,
                            available: 0,
                          });
                        } else {
                          removeStockInfo();
                        }
                      }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="stock"
                      min="0"
                      disabled
                      value={showInfoData.available}
                      onChange={(e) => {
                        showInfoData.available = parseInt(e.target.value);
                      }}
                    />
                    <button
                      onClick={async () => {
                        addStockInfo();
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="button-delete">
                    {loadingProduct === true ? (
                      <button>
                        <Spinner />
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={async () => {
                            await deleteTheProduct(
                              showInfoData.id,
                              showInfoData.imgNames
                            );
                            cambiarEstado(false);
                            updateFetchingApi();
                          }}
                        >
                          Delete this Product
                        </button>
                      </>
                    )}
                  </div>
                </ContainerButtoms>
              </div>
              <ContainerDetails>
                <div className="firstDiv">
                  <p>Articulo: {showInfoData.shortDescription}</p>
                </div>
                <div className="secondDiv">
                  <p>Category: {showInfoData.category}</p>
                </div>
                <div className="finalDiv">
                  <p>Tags: Camisa, Tela negra, especial</p>
                </div>
              </ContainerDetails>
            </ContainerInfo>
          </ContainerModal>
        </Overlay>
      )}
    </>
  );
};

export default ModalInfo;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 120;
`;
const ContainerModal = styled.div`
  width: 74%;
  min-height: 460px;
  background-color: #fdfdfd;
  border-radius: 5px;
  display: flex;
`;

const ContainerImg = styled.div`
  width: 90%;
  display: flex;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContainerInfo = styled.div`
  width: 95%;
  padding: 30px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h2 {
    margin: 0;
    color: #494949;
    padding: 0 0 10px 0;
    text-transform: unset;
  }
  .line-div {
    width: 33px;
    height: 3px;
    background-color: #dbdbdb;
    margin-left: 3px;
  }
  .price-modal {
    margin-top: 7px;
    color: #000;
    font-size: 21px;
    font-weight: 600;
  }
  .long-description__modal {
    color: #777;
    font-size: 13px;
    line-height: 1.5;
    max-height: 180px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      background-color: #44444437;
      width: 4px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #575757;
      border-radius: 5px;
    }
  }
  .products-available {
    font-size: 12px;
    color: #1d8f19;
    padding: 5px 0;
  }
`;

const ContainerButtoms = styled.div`
  display: flex;
  width: 100%;
  .available-input {
    display: flex;
    align-items: center;
    input {
      width: 33px;
      height: 34px;
      border: 1px solid #bebebe;
      border-left: none;
      border-right: none;
      box-shadow: inset 1px 1px 1px rgb(0 0 0 / 10%);
      border-radius: 0px;
      padding: 0;
      text-align: center;
      font-size: 13.7px;
      :focus {
        outline: none;
      }
    }
    button {
      width: 23px;
      height: 34px;
      border: 1px solid #bebebe;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      color: #666;
      background-color: #f9f9f9;
    }
  }
  .button-delete {
    margin-left: 10px;
    button {
      border: 1px solid #da9f47;
      height: 100%;
      background-color: #ebad51;
      font-size: 14px;
      letter-spacing: 0.5px;
      line-height: 1;
      text-transform: uppercase;
      font-weight: 600;
      color: #fff;
      padding: 2px 10px;
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

const ContainerDetails = styled.div`
  padding: 0 10px 20px 0;
  .firstDiv {
    border-top: 1px dotted #ddd;
    border-bottom: 1px dotted #ddd;
  }
  .finalDiv {
    border-top: 1px dotted #ddd;
    border-bottom: 1px dotted #ddd;
  }
  p {
    font-size: 12px;
    padding: 3px 0;
  }
`;
