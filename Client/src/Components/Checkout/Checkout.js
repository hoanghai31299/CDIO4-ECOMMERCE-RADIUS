import React from "react";
import "./Checkout.css";
function Checkount() {
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
              <input type="email" />
            </div>
            <div className="checkout-fist_name">
              <lable className="checkout-item-title">Fist name</lable>
              <br />
              <input type="text" />
            </div>
            <div className="checkout-last_name">
              <lable className="checkout-item-title">Last name</lable>
              <br />
              <input type="text" />
            </div>
            <div className="checkout-phone_number">
              <lable className="checkout-item-title">Phone number</lable>
              <br />
              <input type="number" />
            </div>
            <div className="checkout-address">
              <lable className="checkout-item-title">Address</lable>
              <br />
              <input type="text" />
            </div>
            <div className="checkout-address">
              <lable className="checkout-item-title">Address</lable>
              <br />
              <input type="text" />
            </div>
            <div className="checkout-province_city">
              <lable className="checkout-item-title">Province/City</lable>
              <br />
              <input type="text" />
            </div>
            <div className="checkout-country">
              <lable className="checkout-item-title">Country</lable>
              <br />
              <input type="text" />
            </div>
          </div>

          <div className="checkout-ctp">
            <div>Continue to payment</div>
          </div>

          <div className="order-summary">
            <div className="order-summary-title">ORDER SUMMARY</div>
            <div className="order-summary_head">
              <div className="summary_head-item">Items</div>
              <div className="summary_head-price">Price</div>
            </div>
            <div className="summary-list">
              <div className="summary-item">
                <div className="summary-item__img">
                  <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609519592/Radius-E/ProductDetail-Delete/product/m_ALIO_GD1_1_z6bn6u.webp" />
                </div>
                <div className="summary-item__infor">
                  <div className="summary-item_name">SAL 01</div>
                  <div className="summary-item_quantity">Quantity:1</div>
                </div>
                <div className="summary-item_price">$430.00</div>
              </div>
            </div>
            <div className="summary-price">
              <div className="summary-price-element">
                <div className="summary-price-subtotal">
                  <div className="price-subtotal-title">Subtotal</div>
                  <div className="price-subtotal-price">$100</div>
                </div>
                <div className="summary-price-fee_shipping">
                  <div className="fee_shipping-title">Standard Shipping</div>
                  <div className="fee_shipping-fee">$0.00</div>
                </div>
              </div>
              <div className="summary-price__total">
                <div className="price__total-title">Total</div>
                <div className="price__total-price">$520.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkount;
