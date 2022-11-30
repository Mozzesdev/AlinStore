import styled from "styled-components";
import { motion } from "framer-motion";
import fontUser from "../../img/fontuser.png";
import { useEffect, useRef, useState } from "react";

const ContainerReviews = ({ productSelected, stars }) => {
  const [width, setWidth] = useState(0)
  const reviews = productSelected.reviews;
  const carrousel = useRef()

  useEffect(() => {
    setWidth(carrousel.current?.scrollWidth - carrousel.current?.offsetWidth)
  }, [])
  

  return (
    <ContainerSliderReview reviews={reviews}>
      {reviews?.length > 0 ? (
        <motion.div
          className="container-sep__review"
          drag="x"
          ref={carrousel}
          whileTap={{cursor: 'grabbing'}}
          dragConstraints={{ right: 0, left: -width }}
        >
          {reviews.map((review, index) => {
            return (
              <motion.div
                key={index}
                className="container-card__review"
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                initial={{ opacity: 0, translateY: -50 }}
                whileInView={{
                  opacity: 1,
                  translateY: 0,
                  transition: { duration: 0.7 },
                }}
                viewport={{ once: true }}
              >
                <div className="img-container__review">
                  <img
                    src={review.photoUrl ? review.photoUrl : fontUser}
                    alt=""
                  />
                  <div className="details-review">
                    <p className="name-review">{review.name || review.email}</p>
                    <p className="city-review">{review.city}</p>
                  </div>
                </div>
                <ContainerStars>
                  {stars.map((_, index) => (
                    <motion.svg
                      key={index}
                      width="23"
                      height="23"
                      initial={{ fill: "#838383" }}
                      animate={
                        review.starReview > index
                          ? { fill: "#f3cd21" }
                          : { fill: "#838383" }
                      }
                      transition={{ duration: 0.2, ease: "linear" }}
                    >
                      <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path>
                    </motion.svg>
                  ))}
                </ContainerStars>
                <p>{review.review}</p>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <p>No hay reviews</p>
      )}
      <button className="all-reviews__button">See all reviews</button>
    </ContainerSliderReview>
  );
};

export default ContainerReviews;

const ContainerSliderReview = styled.div`
  width: 100%;
  margin: auto;
  background-color: #ececec;
  border-top: 1px solid #c7c7c794;
  border-bottom: 1px solid #c7c7c790;
  height: 380px;
  .all-reviews__button {
    border: none;
    background-color: #ecb24c;
    font-weight: 500;
    font-size: 13px;
    padding: 5px 20px;
    border-radius: 4px;
    color: #f1f1f1;
    text-align: center;
    display: block;
    margin: auto;
  }
  .container-sep__review {
    display: flex;
    padding: 25px 0;
    cursor: grab;
    justify-content: ${(props) => (props.reviews.length <= 3 ? "center" : "flex-start")};
    .container-card__review {
      background-color: #f6f6f6;
      padding: 20px 15px;
      border-radius: 5px;
      min-width: 290px;
      box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.24);
      height: 280px;
      margin: 0 20px;
      .img-container__review {
        display: flex;
        align-items: center;
        img {
          width: 55px;
          height: 55px;
          border-radius: 50%;
        }
      }
      .details-review {
        width: 100%;
        margin-left: 8px;
        p {
          text-align: left;
          margin: 0;
          line-height: 1;
        }
        .name-review {
          font-weight: 600;
          color: #444;
        }

        .city-review {
          font-size: 12px;
          margin-top: 3px;
        }
      }
      p {
        text-align: left;
        margin: 15px 0 0 0;
        width: 100%;
        font-size: 13px;
      }
    }
  }
`;

const ContainerStars = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  svg {
    transform: scale(0.8);
  }
`;
