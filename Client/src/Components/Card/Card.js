import React, { useState, useEffect } from "react";
import axios from "axios";
import "../StyleSheet/GridLayout.css";
import "./Card.css";

function Card() {
  const [listProduct, setListProduct] = useState({});

  useEffect(() => {
    const getProductAPI = "http://localhost:5000/product";
    axios({
      method: "GET",
      url: "http://localhost:5000/product",
    })
      .then((response) => {
        console.log("12312312312", response.data.product);
      })
      .catch((error) => {
        console.log("aaaa", error);
      });
  }, []);

  return (
    <div>
      <div className="card">
        <div className="grid wide">
          <div className="row">
            <div className="l-9 m-10 c-12">
              <div className="shopping-card">
                <div className="shopping-card__title">SHOPPING BAG</div>
                <div className="shopping-card__list">
                  <div className="shopping-card-item">
                    <table>
                      <tr>
                        <td className="item-info">
                          <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609098368/Radius-E/ProductDetail-Delete/ALIO_01_3_mroqma.webp" />

                          <div className="item-info__text">
                            <span className="item-name">MOMATYY C2</span> <br />
                            <span className="item-price">Price:123usd</span>
                            <br />
                            <span className="item-remove">Remove</span>
                          </div>
                        </td>
                        <td className="item-amount">
                          <label className="item-quantity">Quantity</label>
                          <input type="number" min="1" max="10"></input>
                        </td>
                        <td className="item-total">
                          <p>Total:</p>
                          <p className="item-total__price">123</p>
                        </td>
                      </tr>
                    </table>
                  </div>
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
