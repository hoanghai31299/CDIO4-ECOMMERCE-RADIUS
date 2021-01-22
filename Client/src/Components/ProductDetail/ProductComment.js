import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../GlobalState/UserContext";
import axios from "../../axios";
import "./ProductDetail.css";

function ProductComment({ idProduct }) {
  const urlAvatarUser =
    "https://res.cloudinary.com/hoanghai/image/upload/v1611110971/Radius-E/ProductDetail-Delete/icon-etc/user-circle-solid_mqf0xe.svg";
  const urlStar =
    "https://res.cloudinary.com/hoanghai/image/upload/v1610695063/Radius-E/ProductDetail-Delete/icon-etc/star-solid_goqqte.svg";
  const [dataComment, setDataComment] = useState();
  const [averageRate, setAverageRate] = useState();
  const { user, setUser } = useContext(UserContext);
  const [idUser, setIdUser] = useState();
  const [comment, setComment] = useState();
  const handleAverageRate = (arrStar) => {
    const sumStar = arrStar.reduce((total, value) => {
      return total + value.rate;
    }, 0);
    setAverageRate(Math.ceil(sumStar / arrStar.length));
  };
  const handleShowStar = (averageRate) => {
    let numberArr = [];
    for (let i = 0; i < averageRate; i++) {
      numberArr.push("rate");
    }
    return numberArr;
  };
  const handleRateStart = (rate) => {
    let numberArr = [];
    for (let i = 0; i < rate; i++) {
      numberArr.push("rate");
    }
    return numberArr;
  };

  const handleGetDataComment = (e) => {
    e.preventDefault();
    console.log();
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    axios
      .post(`/comment/create`, comment)
      .then((res) => {
        setComment({});
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios.get(`/comment/${idProduct}`).then((res) => {
      setDataComment(res.data.comment);
      handleAverageRate(res.data.comment);
    });
  }, []);
  useEffect(() => {
    setComment({
      ...comment,
      user_id: user._id,
      product_id: idProduct,
    });
  }, [user]);
  useEffect(() => {}, [comment]);
  const linkStar =
    "https://res.cloudinary.com/hoanghai/image/upload/v1610695063/Radius-E/ProductDetail-Delete/icon-etc/star-solid_goqqte.svg";
  return (
    <>
      <div className="row">
        <div className="wrap-show-comment">
          <div className="show-content-ratings">
            <div className="content-ratings-title">
              Average rate: {averageRate} PER 5
            </div>
            <div className="content-ratings-star">
              {handleShowStar(averageRate).map((item) => {
                return <img atl="img-star" src={urlStar}></img>;
              })}
            </div>
          </div>
          <div className="show-list-coment">
            {dataComment &&
              dataComment.map(({ user_id, rate, content }) => {
                return (
                  <div className="wrap-show-comment-user">
                    <div className="comment-avatar-user">
                      <img
                        alt="avatar-user"
                        src={urlAvatarUser && urlAvatarUser}
                      ></img>
                    </div>
                    <div className="user-comment">
                      <div className="comment-name-user">{user_id.name}</div>
                      <div className="number-rate-start">
                        {handleRateStart(rate).map((item) => {
                          return <img atl="img-star" src={urlStar}></img>;
                        })}
                      </div>
                      <div className="comment-user">{content}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="productcomment-wrap">
          <div className="productcomment-title">
            Did you love it? Let me know!
          </div>
          <div className="productcomment-desc">
            The soft curves of bottom and linear design of the top merge
            together to perfectly blend the frame front. The 100% UV protected
            black Zeiss lenses are accentuated with a metal detail.
          </div>
          <div className="productcomment-rate">
            <div className="rate-star">
              <input
                type="radio"
                name="rate"
                value="1"
                className="star"
                onClick={handleGetDataComment}
              ></input>
              <label className="rate-text">Poor</label>
              <label className="img-star">
                <img alt="img-star" src={linkStar}></img>
              </label>
            </div>
            <div className="rate-star">
              <input
                type="radio"
                name="rate"
                value="2"
                className="star"
                onClick={handleGetDataComment}
              ></input>
              <label className="rate-text">Fair</label>
              <label className="img-star">
                <img alt="img-star" src={linkStar}></img>
                <img alt="img-star" src={linkStar}></img>
              </label>
            </div>
            <div className="rate-star">
              <input
                type="radio"
                name="rate"
                value="3"
                className="star"
                onClick={handleGetDataComment}
              ></input>
              <label className="rate-text">Average</label>
              <label className="img-star">
                <img alt="img-star" src={linkStar}></img>
                <img alt="img-star" src={linkStar}></img>
                <img alt="img-star" src={linkStar}></img>
              </label>
            </div>
            <div className="rate-star">
              <input
                type="radio"
                name="rate"
                value="4"
                className="star"
                onClick={handleGetDataComment}
              ></input>
              <label className="rate-text">Good</label>
              <label className="img-star">
                <img alt="img-star" src={linkStar}></img>
                <img alt="img-star" src={linkStar}></img>
                <img alt="img-star" src={linkStar}></img>
                <img alt="img-star" src={linkStar}></img>
              </label>
            </div>
            <div className="rate-star">
              <input
                type="radio"
                name="rate"
                value="5"
                className="star"
                onClick={handleGetDataComment}
              ></input>
              <label className="rate-text">Execellent</label>
              <label className="img-star">
                <img alt="img-star" src={linkStar}></img>
                <img alt="img-star" src={linkStar}></img>
                <img alt="img-star" src={linkStar}></img>
                <img alt="img-star" src={linkStar}></img>
                <img alt="img-star" src={linkStar}></img>
              </label>
            </div>
          </div>
          <div className="productcomment-comment">
            <textarea
              onChange={handleGetDataComment}
              className="productcomment-textarea"
              name="content"
              cols="40"
              rows="5"
            ></textarea>
            <div className="productcomment-submit" onClick={handleSubmit}>
              SUBMIT YOUR COMMENT
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductComment;
