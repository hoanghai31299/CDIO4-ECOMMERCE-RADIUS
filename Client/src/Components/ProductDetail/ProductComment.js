import React from "react";
import "./ProductDetail.css";
function ProductComment() {
  const linkStar =
    "https://res.cloudinary.com/hoanghai/image/upload/v1610695063/Radius-E/ProductDetail-Delete/icon-etc/star-solid_goqqte.svg";
  return (
    <>
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
                value="1star"
                className="star"
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
                value="2star"
                className="star"
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
                value="3star"
                className="star"
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
                value="4star"
                className="star"
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
                value="5star"
                className="star"
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
              className="productcomment-textarea"
              name="Text1"
              cols="40"
              rows="5"
            ></textarea>
            <div className="productcomment-submit">SUBMIT YOUR COMMENT</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductComment;
