import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../GlobalState/UserContext";
import { Link } from "react-router-dom";
import axios from "../../axios";
import "./WishList.css";

function WishList() {
  const { user, setUser } = useContext(UserContext);
  const [wishList, setWishList] = useState();
  useEffect(() => {
    setWishList(user.wishList);
  }, [user]);
  const handleRemoveWishList = (id) => {
    const updateUser = {
      ...user,
      wishList: user.wishList.filter((i) => i._id !== id),
    };
    setUser(updateUser);
    axios
      .put(`/user/delete_wish_list/${user._id}`, { productId: id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="wishlist">
        <div className="wishlist-title">WISHLIST</div>
        <div className="wrap-product">
          <div className="product-wish-list">
            {wishList &&
              wishList.map(({ _id, name, price, colors }) => {
                return (
                  <div key={_id} className="shopping-card-item">
                    <table>
                      <tr>
                        <td className="item-info">
                          <img src={colors[0].image_url[0]} alt="cartitem" />
                          <div className="item-info__text">
                            <span className="item-name">{name}</span> <br />
                            <span className="item-price">USD {price}</span>
                            <br />
                            <span
                              className="item-remove"
                              onClick={() => handleRemoveWishList(_id)}
                            >
                              Remove
                            </span>
                          </div>
                        </td>

                        <td className="item-total">
                          <p>Total: $ </p>
                          <p className="item-total__price">{price}.00</p>
                        </td>
                      </tr>
                    </table>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="footer-wishlist">
          <div className="footer-ctn-shopping">
            <Link to="/">
              <span>Continute Shopping</span>
            </Link>
          </div>
          <div className="footer-ctn-emty">
            <span>Emty Wishlist</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default WishList;
