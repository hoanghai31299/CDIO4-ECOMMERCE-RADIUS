import React from "react";
import "./WishList.css";

function WishList() {
  return (
    <>
      <div className="wishlist">
        <div className="wishlist-title">WISHLIST</div>
        <div className="wrap-product">
          <div className="product-list">
            <div className="shopping-card-item">
              <table>
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
                      <span className="item-remove">Remove</span>
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
        <div className="footer-wishlist">
          <div className="footer-ctn-shopping">
            <span>Continute Shopping</span>
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
