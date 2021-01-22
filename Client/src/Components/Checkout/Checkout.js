import React, { useState, useEffect, useContext } from "react";
import "./Checkout.css";
import axios from "../../axios";
import { UserContext } from "../../GlobalState/UserContext";

function Checkount() {
  const { user, setUser } = useContext(UserContext);
  const [cart, setCart] = useState(undefined);
  const [code, setCode] = useState();
  console.log("Userrrr", user);
  const [inforCoupon, setInforCoupon] = useState();
  const [subPrice, setSubPrice] = useState();
  const [discount, setDiscount] = useState();
  const [listCoupon, setListCoupon] = useState();

  useEffect(() => {
    axios.get(`/coupon`).then((res) => {
      setListCoupon(res.data.coupon);
    });
  }, []);
  useEffect(() => {
    setCart(user.cart);
  }, [user]);
  useEffect(() => {
    handleSubTotal();
  }, [cart]);

  const handleSubTotal = () => {
    setSubPrice(
      cart &&
        cart.reduce((price, total) => {
          return price + total.productId.price * total.quantity;
        }, 0)
    );
  };
  const handleOnchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleTotalPrice = (e) => {
    if (!listCoupon === undefined) {
      const infCP = listCoupon.find((coupon) => {
        return coupon.code == e.target.value;
      });
      setCode(infCP._id);
      setInforCoupon(infCP);
      if (infCP) {
        if (subPrice > infCP.min) {
          setDiscount(subPrice * infCP.discount);
          if (subPrice > infCP.max) {
            setDiscount(infCP.max);
          }
        }
      } else {
        setDiscount(0);
      }
    } else {
      setDiscount(0);
    }
  };
  const handleSubmit = () => {
    const newCart = cart.map((item) => {
      return {
        productId: item.productId._id,
        colorId: item.colorId,
        quantity: item.quantity,
      };
    });

    axios
      .post(`/order/create`, {
        address: user.address,
        name: user.name,
        phone: user.phone,
        products: newCart,
        couponCode: code,
        userId: user._id,
      })
      .then((res) => {
        if (!res.data.error) {
          alert("Radius-E:Checkout success !!!");
          setUser({ ...user, cart: [] });
          axios
            .put(`/user/cart/${user._id}`, { newCart: [] })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        } else alert("Radius-E:Checkout fail !!!");
      })
      .catch((err) => {});
  };

  return (
    <div>
      <div className="checkout">
        <div className="checkout-body">
          <div className="checkout-info">
            <div className="page-title">SHOPPING ADDRESS</div>
            <div className="page-desc">
              You are currently in the Vietnam store. Shipping to a different
              location? Please provide customer information in English only.
            </div>
            <div className="checkout-email">
              <lable className="checkout-item-title">Email</lable>
              <br />
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleOnchange}
              />
            </div>
            <div className="checkout-fist_name">
              <lable className="checkout-item-title">Full Name</lable>
              <br />
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleOnchange}
              />
            </div>

            <div className="checkout-phone_number">
              <lable className="checkout-item-title">Phone number</lable>
              <br />
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleOnchange}
              />
            </div>
            <div className="checkout-address">
              <lable className="checkout-item-title">Address</lable>
              <br />
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleOnchange}
              />
            </div>
            <div className="checkout-address">
              <lable
                className="checkout-item-title"
                // value={inforUser.couponCode}
                onChange={handleOnchange}
              >
                Coupon code
              </lable>
              <br />
              <input type="text" name="coupon" onChange={handleTotalPrice} />
            </div>
            <div className="coupon-infor">
              <div className="coupon-title">COUPON</div>
              {!inforCoupon ? (
                "This coupon is not available"
              ) : (
                <>
                  <lable className="checkout-item-title">
                    Name coupon: {inforCoupon.title}
                  </lable>
                  <br />
                  <lable className="checkout-item-title">
                    Lowest Subtotal: {inforCoupon.min}
                  </lable>
                  <br />
                  <lable className="checkout-item-title">
                    Max amount: {inforCoupon.max}
                  </lable>
                  <br />
                  <label> {inforCoupon.description}</label>
                </>
              )}
            </div>
          </div>
          <div className="checkout-ctp">
            <div onClick={handleSubmit}>Continue to payment</div>
          </div>
          {/* {err.error ? (
            <div className="checkout-err">Err: {err.message}</div>
          ) : (
            ""
          )}
          {checkSuccess.message === "create order successful" ? (
            <div className="checkout-succes">Checkout success</div>
          ) : (
            ""
          )} */}
          <div className="order-summary">
            <div className="order-summary-title">ORDER SUMMARY</div>
            <div className="order-summary_head">
              <div className="summary_head-item">Items</div>
              <div className="summary_head-price">Price</div>
            </div>
            <div className="summary-list">
              {cart &&
                cart.map(({ _id, productId, quantity, name, colorId }) => {
                  return (
                    <div key={_id} className="summary-item">
                      <div className="summary-item__img">
                        <img
                          alt="img-item"
                          src={
                            productId.colors.find((cl) => cl.color === colorId)
                              .image_url[0]
                          }
                        />
                      </div>
                      <div className="summary-item__infor">
                        <div className="summary-item_name">
                          {productId.name}
                        </div>
                        <div className="summary-item_quantity">
                          Quantity: {quantity}
                        </div>
                      </div>
                      <div className="summary-item_price">
                        $ {productId.price * quantity}.00
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="summary-price">
              <div className="summary-price-element">
                <div className="summary-price-subtotal">
                  <div className="price-subtotal-title">Subtotal</div>
                  <div className="price-subtotal-price">${subPrice}</div>
                </div>
                <div className="summary-price-fee_shipping">
                  <div className="fee_shipping-title">Coupon</div>
                  <div className="fee_shipping-fee">${discount}</div>
                </div>
              </div>
              <div className="summary-price__total">
                <div className="price__total-title">Total: $</div>
                <div className="price__total-price">
                  {discount ? subPrice - discount : subPrice}.00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkount;
