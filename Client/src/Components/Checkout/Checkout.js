import React, { useState, useEffect } from "react";
import "./Checkout.css";
import axios from "../../axios";
function Checkount() {
  const [orderInfor, setOrderInfor] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    products: [],
  });
  const [err, setErr] = useState({
    error: "",
    message: "",
  });
  const [checkSuccess, setCheckSuccess] = useState({
    message: "",
  });
  const [inforCoupon, setInforCoupon] = useState();
  const [subPrice, setSubPrice] = useState();
  const [discount, setDiscount] = useState();
  const [listProduct, setListProduct] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [listCoupon, setListCoupon] = useState();
  const [inforUser, setInforUser] = useState({
    id_: "",
    email: "",
    name: "",
    phone: "",
    address: "",
    couponCode: "",
  });
  useEffect(() => {
    axios
      .get(`/auth/signinW/`)
      .then((res) => {
        setListProduct(res.data.user.cart);
        setInforUser({ ...inforUser, ...res.data.user });
        const cart = res.data.user.cart;
        const products = cart.map((item) => {
          var rObj = {};
          rObj.productId = item.productId;
          rObj.colorId = item.colorId;
          rObj.quantity = item.quantity;
          return rObj;
        });
        setOrderInfor({
          ...orderInfor,
          _id: res.data.user._id,
          name: res.data.user.name,
          email: res.data.user.email,
          phone: res.data.user.phone,
          address: res.data.user.address,
          products: products,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get(`/coupon`).then((res) => {
      setListCoupon(res.data.coupon);
    });
  }, []);
  useEffect(() => {
    fetchProduct();
  }, [listProduct]);

  const fetchProduct = async () => {
    let items = [];
    for (let i = 0; i < listProduct.length; i++) {
      try {
        const prod = listProduct[i];
        const { data } = await axios.get(
          `/product/${listProduct[i].productId}`
        );
        if (data === undefined) continue;
        if (!data.error) {
          const { product } = data;
          const color = product.colors.find(
            (ite) => ite.color === listProduct[i].colorId
          );
          items.push({
            ...color,
            quantity: listProduct[i].quantity,
            name: product.name,
            price: product.price,
            stock: product.quantity,
          });
        } else throw new Error(data.message);
      } catch (error) {
        continue;
      }
    }
    setCartItem(items);
    setSubPrice(
      items.reduce((price, total) => {
        return price + total.price * total.quantity;
      }, 0)
    );
  };
  const handleOnchange = (e) => {
    setInforUser({ ...inforUser, [e.target.name]: e.target.value });
  };
  const handleTotalPrice = (e) => {
    const infCP = listCoupon.find((coupon) => {
      return coupon.code == e.target.value;
    });
    setInforCoupon(infCP);
    console.log("thong tin giam gia", infCP);
    if (inforCoupon) {
      console.log("aaaaaaaa", inforCoupon);
      if (subPrice > inforCoupon.min) {
        setDiscount(subPrice * inforCoupon.discount);
        if (discount > inforCoupon.max) {
          setDiscount(inforCoupon.max);
        }
      }
    }
  };
  const handleSubmit = () => {
    axios
      .post("/order/create", orderInfor)
      .then((res) => {
        setCheckSuccess({ message: res.data.message });
      })
      .catch((error) => {
        setErr({
          error: error.response.data.error,
          message: error.response.data.message,
        });
      });
    axios.put(`/user/cart/${orderInfor._id}`, { newCart: [] });
    alert("thanh toan thanh cong");
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
                value={inforUser.email}
                onChange={handleOnchange}
              />
            </div>
            <div className="checkout-fist_name">
              <lable className="checkout-item-title">Full Name</lable>
              <br />
              <input
                type="text"
                name="name"
                value={inforUser.name}
                onChange={handleOnchange}
              />
            </div>

            <div className="checkout-phone_number">
              <lable className="checkout-item-title">Phone number</lable>
              <br />
              <input
                type="text"
                name="phone"
                value={inforUser.phone}
                onChange={handleOnchange}
              />
            </div>
            <div className="checkout-address">
              <lable className="checkout-item-title">Address</lable>
              <br />
              <input
                type="text"
                name="address"
                value={inforUser.address}
                onChange={handleOnchange}
              />
            </div>
            <div className="checkout-address">
              <lable
                className="checkout-item-title"
                value={inforUser.couponCode}
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
          {err.error ? (
            <div className="checkout-err">Err: {err.message}</div>
          ) : (
            ""
          )}
          {checkSuccess.message === "create order successful" ? (
            <div className="checkout-succes">Checkout success</div>
          ) : (
            ""
          )}
          <div className="order-summary">
            <div className="order-summary-title">ORDER SUMMARY</div>
            <div className="order-summary_head">
              <div className="summary_head-item">Items</div>
              <div className="summary_head-price">Price</div>
            </div>
            <div className="summary-list">
              {cartItem.map((item) => {
                return (
                  <div className="summary-item">
                    <div className="summary-item__img">
                      <img src={item.image_url[0]} />
                    </div>
                    <div className="summary-item__infor">
                      <div className="summary-item_name">{item.name}</div>
                      <div className="summary-item_quantity">
                        Quantity: {item.quantity}
                      </div>
                    </div>
                    <div className="summary-item_price">
                      $ {item.price * item.quantity}.00
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
