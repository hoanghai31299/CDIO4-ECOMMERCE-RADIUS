import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../axios";
function ProductCard({ product }) {
  const [idUser, setIdUser] = useState();
  const [isWishList, setIsWishList] = useState();
  const [wishList, setWishList] = useState([]);
  const [current, setCurrent] = useState(0);
  const handleAddWishList = (id) => {
    axios
      .post(`/user/add_wish_list/${idUser}`, { productId: id })
      .then((res) => setWishList(res.data.user.wishList))
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRemoveWishList = (id) => {
    axios
      .delete(`/user/delete_wish_list/${idUser}`, { productId: id })
      .then((res) => {
        setWishList(res.data.user.wishList);
        checkWishList(res.data.user._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkWishList = (id) => {
    for (let i = 0; i < wishList.length; i++) {
      if (wishList[i] === id) {
        console.log("vo roi");
        setIsWishList(true);
        break;
      } else {
        setIsWishList(false);
      }
    }
  };
  useState(() => {
    axios
      .get(`/auth/signinW`)
      .then((res) => {
        setWishList(res.data.user.wishList);
        setIdUser(res.data.user._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // useState(() => {
  //   checkWishList(product.id);
  // }, [wishList]);
  return (
    <>
      <div className="product-item">
        <Link to={`/product-detail/${product._id}`}>
          <div className="product-img">
            <img
              src={product.colors[current].image_url[0]}
              alt="product-item"></img>
          </div>
        </Link>
        <div className="favorite-icon">
<<<<<<< HEAD
          {isWishList ? (
            <div
              className="favorite-icon__on"
              onClick={() => handleRemoveWishList(product._id)}
            >
              <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609597114/Radius-E/ProductDetail-Delete/icon-heart/heart-solid_ovskat.svg" />
            </div>
          ) : (
            <div
              className="favorite-icon__off"
              onClick={() => handleAddWishList(product._id)}
            >
              <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609597115/Radius-E/ProductDetail-Delete/icon-heart/heart-regular_umpjua.svg" />
            </div>
          )}
=======
          <div className="favorite-icon__off">
            <img
              alt="like-icon"
              src="https://res.cloudinary.com/hoanghai/image/upload/v1609597115/Radius-E/ProductDetail-Delete/icon-heart/heart-regular_umpjua.svg"
            />
          </div>
          <div className="favorite-icon__on">
            <img
              alt="like-icon"
              src="https://res.cloudinary.com/hoanghai/image/upload/v1609597114/Radius-E/ProductDetail-Delete/icon-heart/heart-solid_ovskat.svg"
            />
          </div>
>>>>>>> master
        </div>
        <div className="product-infor">
          <div className="product-name">{product.name}</div>
          <div className="product-color-list">
            {product.colors.map((cl, i) => {
              return (
                <div
                  className={`product-color-item  ${current === i && "chosen"}`}
                  onClick={() => setCurrent(i)}>
                  <div
                    className="product-chip"
                    style={{ background: `#${cl.color.hex}` }}></div>
                </div>
              );
            })}
          </div>
          <div className="product-price">USD {product.price}</div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
