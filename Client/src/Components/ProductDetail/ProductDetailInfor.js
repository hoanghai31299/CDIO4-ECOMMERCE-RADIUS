import React from "react";
import axios from "../../axios";
function ProductDetailInfor({
  description,
  name,
  price,
  _id,
  colors,
  currColorIndex,
  setColorIndex,
}) {
  console.log(localStorage.getItem("cart"));
  const onAddToBag = async () => {
    try {
      const { data } = await axios.post("/user/cart", {
        productId: _id,
        colorId: colors[currColorIndex].color,
      });
      if (data.error) {
        throw new Error();
        // else {}
      }
    } catch (error) {
      const cart = localStorage.getItem("cart");
      let newCart;
      let check = false;
      if (cart) {
        newCart = JSON.parse(cart);
        newCart = newCart.map((item) => {
          if (
            item.productId == _id &&
            item.colorId == colors[currColorIndex].color
          ) {
            item.quantity = item.quantity + 1;
            check = true;
          }
          return item;
        });
        if (!check)
          newCart.push({
            productId: _id,
            colorId: colors[currColorIndex].color,
            quantity: 1,
          });
      } else {
        newCart = [
          {
            productId: _id,
            colorId: colors[currColorIndex].color,
            quantity: 1,
          },
        ];
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };
  return (
    <>
      <div className="product_detail--info l-4">
        <div className="product_detail--info__section">
          <div className="product_detail-title">{name}</div>
          <div className="product_detail-price">USD {price}.00</div>
          <div className="product_detail-desc">{description.main}</div>
          <div className="product_detail-color">
            <p className="color">Color</p>
            <div className="img-product__color">
              {colors.map((cl, i) => {
                return (
                  <img
                    key={cl.color._id}
                    onClick={() => {
                      setColorIndex(i);
                    }}
                    className="img_color-number"
                    alt="color"
                    src={cl.image_url[0]}
                  />
                );
              })}
            </div>
          </div>
          <div className="product_detail-button">
            {colors[currColorIndex].quantity === 0 ? (
              <div className="button-add_to_bag">OUT OF STOCK</div>
            ) : (
              <div onClick={onAddToBag} className="button-add_to_bag">
                ADD TO SHOPPING BAG
              </div>
            )}
          </div>
        </div>
        <div className="product_detail-etc">
          <div className="product_detail-specifications">
            <img
              className="icon-etc"
              src="https://res.cloudinary.com/hoanghai/image/upload/v1609183315/Radius-E/ProductDetail-Delete/icon-etc/ruler-horizontal-solid_bwf49d.svg"
            />
            <p>{description.size}</p>
          </div>
          <div className="product_detail--origin">
            <img
              className="icon-etc"
              src="https://res.cloudinary.com/hoanghai/image/upload/v1609183316/Radius-E/ProductDetail-Delete/icon-etc/industry-solid_hogsny.svg"
            />
            <p>{description.sku}</p>
          </div>
          <div className="product_detail--shipping">
            <img
              className="icon-etc"
              src="https://res.cloudinary.com/hoanghai/image/upload/v1609183315/Radius-E/ProductDetail-Delete/icon-etc/truck-solid_fs22j6.svg"
            />
            <p>
              Shipping • Free express shipping with a minimum purchase of $190
              and above • Import duties information Delivery duties are included
              in the item price when shipping to Canada, France, Germany, Italy,
              Japan, Singapore, Taiwan, Thailand, United Arab Emirates, United
              Kingdom. All import duties are included in your order – the price
              you see is the price you pay.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailInfor;
