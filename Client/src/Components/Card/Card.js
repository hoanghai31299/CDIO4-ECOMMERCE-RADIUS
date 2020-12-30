import React from "react";

function Card() {
  const [products, setProduct] = React.useState([
    {
      name: "MOMATI YC2",
      price: "46",
      description:
        "This perfectly sized classic design is highlighted by the rounded edges of the frame front and contoured temples with a GENTLE MONSTER logo.",
      color: "red",
      categories: "dsfadfds",
    },
  ]);

  return (
    <div>
      <div className="card">
        <div className="grid wide">
          <div className="row">
            <div className="l-10 m-10 c-12">
              <div className="shopping-card">
                <div className="shopping-card__title">SHOPPING BAG</div>
                <div className="shopping-card__list">
                  <div className="shopping-card-item">
                    <table>
                      <tr>
                        <td>
                          <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609098368/Radius-E/ProductDetail-Delete/ALIO_01_3_mroqma.webp"></img>
                        </td>
                        <td className="item-info">
                          <div className="item-name"></div>
                          <div className="item-price"></div>
                          <div className="item-remove"></div>
                        </td>
                        <td className="item-amount">
                          <div className="increase-item"></div>
                          <div className="a">Quantify </div>
                          <div className="reduce-item"></div>
                        </td>
                        <td className></td>
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
