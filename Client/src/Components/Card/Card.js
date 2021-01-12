import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import { UserContext } from "../../GlobalState/UserContext";
import "../StyleSheet/GridLayout.css";
import "./Card.css";

function Card() {
  const { user, setUser } = useContext(UserContext);
  const [cart, setCart] = useState(undefined);
  useEffect(() => {
    setCart(user.cart);
  }, [user]);
  const handleRemoveCart = async (id) => {
    const updateCart = cart.filter((item) => item._id !== id);
    axios
      .put(`/user/cart/${user._id}`, {
        newCart: updateCart.map((item) => ({
          productId: item.productId._id,
          colorId: item.colorId,
          quantity: item.quantity,
        })),
      })
      .then((res) => {
        console.log(res);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddQuuantity = (id, quantity) => {
    const updateCart = [...cart];
    if (updateCart[id].quantity === quantity) return;
    updateCart[id].quantity = updateCart[id].quantity + 1;
    setUser({ ...user, cart: updateCart });
    axios
      .put(`/user/cart/${user._id}`, {
        newCart: updateCart.map((item) => ({
          productId: item.productId._id,
          colorId: item.colorId,
          quantity: item.quantity,
        })),
      })
      .then((res) => {
        if (!res.data.error) return;
        else throw new Error(res.data.message);
      })
      .catch((err) => console.log(err));
  };
  const handleSubtrQuantity = (id) => {
    const updateCart = [...cart];
    if (updateCart[id].quantity === 1) return;
    updateCart[id].quantity = updateCart[id].quantity - 1;
    setUser({ ...user, cart: updateCart });
    axios
      .put(`/user/cart/${user._id}`, {
        newCart: updateCart.map((item) => ({
          productId: item.productId._id,
          colorId: item.colorId,
          quantity: item.quantity,
        })),
      })
      .then((res) => {
        if (!res.data.error) return;
        else throw new Error(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="card">
        <div className="grid wide">
          <div className="row">
            <div className="l-9 m-10 c-12">
              <div className="shopping-card">
                <div className="shopping-card__title">SHOPPING BAG</div>
                <div className="shopping-card__list">
                  {cart &&
                    cart.map(({ _id, productId, quantity, colorId }, index) => (
                      <div key={_id} className="shopping-card-item">
                        <table>
                          <tr>
                            <td className="item-info">
                              <img
                                src={
                                  productId.colors.find(
                                    (cl) => cl.color === colorId
                                  ).image_url[0]
                                }
                                alt="cartitem"
                              />
                              <div className="item-info__text">
                                <span className="item-name">
                                  {productId.name}
                                </span>{" "}
                                <br />
                                <span className="item-price">
                                  USD {productId.price}.00
                                </span>
                                <br />
                                <span
                                  className="item-remove"
                                  onClick={() => handleRemoveCart(_id)}>
                                  Remove
                                </span>
                              </div>
                            </td>
                            <td className="item-amount">
                              <div className="item-amount__quantity">
                                <label className="item-quantity">
                                  Quantity
                                </label>
                                <img
                                  onClick={() =>
                                    handleAddQuuantity(
                                      index,
                                      productId.quantity
                                    )
                                  }
                                  className="icon-add_sub"
                                  alt="icon-add"
                                  src="https://res.cloudinary.com/hoanghai/image/upload/v1610037178/Radius-E/ProductDetail-Delete/icon-etc/plus-solid_qpf4iw.svg"></img>
                                <input
                                  className="cart--item__quatity"
                                  type="number"
                                  value={quantity}></input>
                                <img
                                  onClick={() =>
                                    handleSubtrQuantity(
                                      index,
                                      productId.quantity
                                    )
                                  }
                                  className="icon-add_sub"
                                  alt="icon-sub"
                                  src="https://res.cloudinary.com/hoanghai/image/upload/v1610037179/Radius-E/ProductDetail-Delete/icon-etc/minus-solid_ewiped.svg"></img>
                              </div>
                            </td>
                            <td className="item-total">
                              <p>Total: $ </p>
                              <p className="item-total__price">
                                {productId.price * quantity}.00
                              </p>
                            </td>
                          </tr>
                        </table>
                      </div>
                    ))}
                </div>
                <div className="checkout">
                  <Link to="/checkout">
                    <label className="goto_checkout">Go to Checkout</label>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
