import React, { useEffect, useState, useContext } from "react";

import axios from "../../axios";
import { UserContext } from "../../GlobalState/UserContext";
import "./TrackYourOrder.css";

function TrackYourOrder() {
  const { user, setUser } = useContext(UserContext);
  const [order, setOrder] = useState();
  const [trackOrder, setTrackOrder] = useState([]);
  useEffect(() => {
    axios
      .get(`/order/by_user/${user._id}`)
      .then((res) => {
        setOrder(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);
  useEffect(() => {
    handleTrackOrder();
  }, [order]);
  const handleTrackOrder = () => {
    const trackOrderTemp =
      order &&
      order.map((item) => {
        return {
          _id: item._id,
          status: item.status,
          createdAt: item.createdAt,
          lastTotal: item.lastTotal,
          quantity: item.products[0].quantity,
          name: item.products[0].productId.name,
          price: item.products[0].productId.price,
          img_url: item.products[0].productId.colors.filter((cl) => {
            return cl.color === item.products[0].colorId._id;
          })[0].image_url[0],
        };
      });

    setTrackOrder(trackOrderTemp);
  };
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
          <div className="product-list-track">
            {trackOrder &&
              trackOrder.map(
                ({
                  _id,
                  createdAt,
                  lastTotal,
                  quantity,
                  name,
                  price,
                  img_url,
                }) => {
                  return (
                    <div key={_id} className="shopping-card-item-checkout">
                      <table className="table-track-your-order">
                        <tr>
                          <td className="item-info">
                            <img src={img_url} alt="cartitem" />
                            <div className="item-info__text">
                              <span className="item-name">{name}</span> <br />
                              <span className="item-price">USD {price}.00</span>
                              <br />
                            </div>
                          </td>
                          <td className="item-amount">
                            <div className="item-amount__quantity">
                              <p>Quantity</p>
                              <label className="item-quantity">
                                {quantity}
                              </label>
                            </div>
                          </td>
                          <td className="item-total">
                            <p>Total: $ </p>
                            <p className="item-total__price">
                              {quantity * price}.00
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>Create day: {createdAt}</td>
                        </tr>
                      </table>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackYourOrder;
