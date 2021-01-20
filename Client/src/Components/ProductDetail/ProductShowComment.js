import React from "react";
import "./ProductDetail.css";

function ProductShowComment() {
  const urlAvatarUser =
    "https://res.cloudinary.com/hoanghai/image/upload/v1611110971/Radius-E/ProductDetail-Delete/icon-etc/user-circle-solid_mqf0xe.svg";
  const urlStar =
    "https://res.cloudinary.com/hoanghai/image/upload/v1610695063/Radius-E/ProductDetail-Delete/icon-etc/star-solid_goqqte.svg";
  return (
    <>
      <div className="row">
        <div className="wrap-show-comment">
          <div className="show-content-ratings">
            <div className="content-ratings-title">Average rate: 4 PER 5</div>
            <div className="content-ratings-star">
              <img atl="img-star" src={urlStar}></img>
              <img atl="img-star" src={urlStar}></img>
              <img atl="img-star" src={urlStar}></img>
              <img atl="img-star" src={urlStar}></img>
            </div>
          </div>
          <div className="wrap-show-comment-user">
            <div className="comment-avatar-user">
              <img alt="avatar-user" src={urlAvatarUser}></img>
            </div>
            <div className="user-comment">
              <div className="comment-name-user">Nguyễn Văn A</div>
              <div className="number-rate-start">
                <img atl="img-star" src={urlStar}></img>
                <img atl="img-star" src={urlStar}></img>
                <img atl="img-star" src={urlStar}></img>
                <img atl="img-star" src={urlStar}></img>
              </div>
              <div className="comment-user">Đẹp như người yêu cũ</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductShowComment;
