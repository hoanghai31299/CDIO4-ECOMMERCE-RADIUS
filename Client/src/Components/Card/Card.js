import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import "../StyleSheet/GridLayout.css";
import "./Card.css";

function Card() {
  const [_idUser, set_IdUser] = useState();
  const [cartItem, setCartItem] = useState([]);
  const [listInforCart, setListInforCart] = useState([]);
  useEffect(() => {
    axios
      .get("/auth/signinW")
      .then((res) => {
        setListInforCart(res.data.user.cart);
        console.log("lissssssss", res.data.user.cart);
        set_IdUser(res.data.user._id);
      })
      .catch((err) => {});
  }, []);
  const fetchProduct = async () => {
    let items = [];
    for (let i = 0; i < listInforCart.length; i++) {
      try {
        const { data } = await axios.get(
          `/product/${listInforCart[i].productId}`
        );
        if (data === undefined) continue;
        if (!data.error) {
          const { product } = data;
          const color = product.colors.find(
            (ite) => ite.color === listInforCart[i].colorId
          );
          items.push({
            ...color,
            quantity: listInforCart[i].quantity,
            name: product.name,
            price: product.price,
            stock: product.quantity,
            _id: product._id,
          });
        } else throw new Error(data.message);
      } catch (error) {
        continue;
      }
    }
    setCartItem(items);
  };
  useEffect(() => {
    fetchProduct();
  }, [listInforCart]);
  const handleRemoveCart = async (id) => {
    const newCart = [...cartItem];
    const updateCart = [...listInforCart];
    for (let i = 0; i < newCart.length; i++) {
      if (id === newCart[i]._id) {
        newCart.splice(i, i + 1);
        updateCart.splice(i, i + 1);
      }
    }
    setCartItem(newCart);
    console.log("newCart", newCart);
    console.log("list cart", updateCart);
    axios
      .put(`/user/cart/${_idUser}`, { newCart: updateCart })
      .then((res) => {
        setListInforCart(res.data.user.cart);
      })
      .catch((err) => {
        console.log(err);
      });
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
                  {cartItem.map((item) => (
                    <div className="shopping-card-item">
                      <table>
                        <tr>
                          <td className="item-info">
                            <img src={item.image_url[0]} alt="cartitem" />
                            <div className="item-info__text">
                              <span className="item-name">{item.name}</span>{" "}
                              <br />
                              <span className="item-price">
                                USD {item.price}.00
                              </span>
                              <br />
                              <span
                                className="item-remove"
                                onClick={() => handleRemoveCart(item._id)}
                              >
                                Remove
                              </span>
                            </div>
                          </td>
                          <td className="item-amount">
                            <label className="item-quantity">Quantity</label>
                            <input
                              type="number"
                              min="1"
                              max={item.stock}
                              value={item.quantity}
                            ></input>
                          </td>
                          <td className="item-total">
                            <p>Total: $ </p>
                            <p className="item-total__price">
                              {item.price * item.quantity}.00
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
