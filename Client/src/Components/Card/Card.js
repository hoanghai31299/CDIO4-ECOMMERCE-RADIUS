import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import "../StyleSheet/GridLayout.css";
import "./Card.css";

function Card() {
  const [_idUser, set_IdUser] = useState();
  const [cartItem, setCartItem] = useState([]);
  const [listInforCart, setListInforCart] = useState([]);
  const [err, setErr] = useState({
    error: false,
    message: "",
  });

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
    console.log("newwwwcart", newCart);
    setCartItem(newCart);
    axios
      .put(`/user/cart/${_idUser}`, { newCart: updateCart })
      .then((res) => {
        setListInforCart(res.data.user.cart);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddQuuantity = (quantity, _iProduct, stock) => {
    const addQuantity = [...listInforCart];
    for (let i = 0; i < addQuantity.length; i++) {
      if (addQuantity[i].productId === _iProduct) {
        if (addQuantity[i].stock === stock) {
          alert("Quantity has reached maximum.");
        } else {
          addQuantity[i].quantity = quantity + 1;
          axios
            .put(`/user/cart/${_idUser}`, { newCart: addQuantity })
            .then((res) => {
              setListInforCart(res.data.user.cart);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        break;
      }
    }
  };
  const handleSubtrQuantity = (quantity, _iProduct) => {
    const subQuantity = [...listInforCart];
    for (let i = 0; i < subQuantity.length; i++) {
      if (subQuantity[i].productId === _iProduct) {
        if (subQuantity[i].quantity === 1) {
          alert("Quantity has reached the minimum level.");
        } else {
          subQuantity[i].quantity = quantity - 1;
          axios
            .put(`/user/cart/${_idUser}`, { newCart: subQuantity })
            .then((res) => {
              setListInforCart(res.data.user.cart);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        break;
      }
    }
  };
  // useEffect(() => {}, [valueChang]);
  const handleOnchange = (e, _iProduct, quantity) => {
    e.preventDefault();
    const changeQuantity = [...listInforCart];
    for (let i = 0; i < changeQuantity.length; i++) {
      if (changeQuantity[i].productId === _iProduct) {
        if (
          changeQuantity[i].stock < quantity ||
          changeQuantity[i].stock === quantity ||
          quantity === 1 ||
          quantity < 1
        ) {
          alert(`Quantity from ${1} to ${changeQuantity[i].stock}`);
        } else {
          changeQuantity[i].quantity = e.target.value;
          axios
            .put(`/user/cart/${_idUser}`, { newCart: changeQuantity })
            .then((res) => {
              setListInforCart(res.data.user.cart);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        break;
      }
    }
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
                            <div className="item-amount__quantity">
                              <label className="item-quantity">Quantity</label>
                              <img
                                onClick={() =>
                                  handleAddQuuantity(
                                    item.quantity,
                                    item._id,
                                    item.stock
                                  )
                                }
                                className="icon-add_sub"
                                alt="icon-add"
                                src="https://res.cloudinary.com/hoanghai/image/upload/v1610037178/Radius-E/ProductDetail-Delete/icon-etc/plus-solid_qpf4iw.svg"
                              ></img>
                              <input
                                className="cart--item__quatity"
                                type="number"
                                min="1"
                                max={item.stock}
                                value={item.quantity}
                                onChange={(e) =>
                                  handleOnchange(e, item._id, item.stock)
                                }
                              ></input>
                              <img
                                onClick={() =>
                                  handleSubtrQuantity(
                                    item.quantity,
                                    item._id,
                                    item.stock
                                  )
                                }
                                className="icon-add_sub"
                                alt="icon-sub"
                                src="https://res.cloudinary.com/hoanghai/image/upload/v1610037179/Radius-E/ProductDetail-Delete/icon-etc/minus-solid_ewiped.svg"
                              ></img>
                            </div>
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
                  {!err ? (
                    "123"
                  ) : (
                    <div className="notification-err">{err.error}</div>
                  )}
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
