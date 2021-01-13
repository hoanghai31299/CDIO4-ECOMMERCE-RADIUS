import React from "react";
import "./TrackYourOrder.css";
function TrackYourOrder() {
  return (
    <>
      <div className="track-your-order">
        <div className="wrap-header">
          <ul className="header-list-item">
            <li className="header-item">
              <span className="is-active">ALL</span>
            </li>
            <li className="header-item">
              <span className="">CONFIRMMATION</span>
            </li>
            <li className="header-item">
              <span>WAITING GOODS</span>
            </li>
            <li className="header-item">
              <span>DELIVERY</span>
            </li>
            <li className="header-item">
              <span>DELIVERED</span>
            </li>
            <li className="header-item">
              <span>CANCELLED</span>
            </li>
          </ul>
        </div>
        <div className="wrap-product">
          <div className="product-list">
            <div className="shopping-card-item">
              <table className="table-track-your-order">
                <tr>
                  <td className="item-info">
                    <img
                      src="https://res.cloudinary.com/hoanghai/image/upload/v1609688292/Radius-E/product/a4vtfm0ejswmgnzbpxmw.webp"
                      alt="cartitem"
                    />
                    <div className="item-info__text">
                      <span className="item-name">JPDD 0D</span> <br />
                      <span className="item-price">USD 123.00</span>
                      <br />
                    </div>
                  </td>
                  <td className="item-amount">
                    <div className="item-amount__quantity">
                      <label className="item-quantity">Quantity</label>
                      <p>12</p>
                    </div>
                  </td>
                  <td className="item-total">
                    <p>Total: $ </p>
                    <p className="item-total__price">123.00</p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackYourOrder;
