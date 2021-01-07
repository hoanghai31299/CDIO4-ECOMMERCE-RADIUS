import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function ProductCard({ product }) {
  const [current, setCurrent] = useState(0);
  return (
    <>
      <div className="product-item">
        <Link to={`/product-detail/${product._id}`}>
          <div className="product-img">
            <img
              src={product.colors[current].image_url[0]}
              alt="product-item"
            ></img>
          </div>
        </Link>
        <div className="favorite-icon">
          <div className="favorite-icon__off">
            <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609597115/Radius-E/ProductDetail-Delete/icon-heart/heart-regular_umpjua.svg" />
          </div>
          <div className="favorite-icon__on">
            <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609597114/Radius-E/ProductDetail-Delete/icon-heart/heart-solid_ovskat.svg" />
          </div>
        </div>
        <div className="product-infor">
          <div className="product-name">{product.name}</div>
          <div className="product-color-list">
            {product.colors.map((cl, i) => {
              return (
                <div
                  className={`product-color-item  ${current == i && "chosen"}`}
                  onClick={() => setCurrent(i)}
                >
                  <div
                    className="product-chip"
                    style={{ background: `#${cl.color.hex}` }}
                  ></div>
                </div>
              );
            })}
          </div>
          <div className="product-price">USD {product.price}</div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
