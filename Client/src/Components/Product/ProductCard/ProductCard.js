import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../axios";
import { UserContext } from "../../../GlobalState/UserContext";
function ProductCard({ product, isLike }) {
  const { user, setUser } = useContext(UserContext);
  const [current, setCurrent] = useState(0);
  const handleAddWishList = () => {
    const updateUser = { ...user, wishList: [...user.wishList, product] };
    setUser(updateUser);
    axios
      .post(`/user/add_wish_list/${user._id}`, { productId: product._id })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRemoveWishList = () => {
    const updateUser = {
      ...user,
      wishList: user.wishList.filter((i) => i._id !== product._id),
    };
    setUser(updateUser);
    axios
      .put(`/user/delete_wish_list/${user._id}`, { productId: product._id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              alt="product-item"
            ></img>
          </div>
        </Link>
        <div className="favorite-icon">
          {!isLike ? (
            <div className="favorite-icon__off">
              <img
                onClick={handleAddWishList}
                alt="like-icon"
                src="https://res.cloudinary.com/hoanghai/image/upload/v1609597115/Radius-E/ProductDetail-Delete/icon-heart/heart-regular_umpjua.svg"
              />
            </div>
          ) : (
            <div className="favorite-icon__on">
              <img
                onClick={handleRemoveWishList}
                alt="like-icon"
                src="https://res.cloudinary.com/hoanghai/image/upload/v1609597114/Radius-E/ProductDetail-Delete/icon-heart/heart-solid_ovskat.svg"
              />
            </div>
          )}
        </div>
        <div className="product-infor">
          <div className="product-name">{product.name}</div>
          <div className="product-color-list">
            {product.colors.map((cl, i) => {
              return (
                <div
                  className={`product-color-item  ${current === i && "chosen"}`}
                  onClick={() => setCurrent(i)}
                >
                  <div
                    className="product-chip"
                    style={{ background: `#${cl.color.hex}` }}
                  ></div>
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
