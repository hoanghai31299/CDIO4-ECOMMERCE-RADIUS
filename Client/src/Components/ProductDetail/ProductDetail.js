import React, { useState, useEffect } from "react";
import "../StyleSheet/GridLayout.css";
import "./ProductDetail.css";
import { useParams } from "react-router-dom";
import axio from "../../axios";
import ProductDetailImg from "./ProductDetailImg";
import ProductDetailInfor from "./ProductDetailInfor";
import ProductDetailRecommand from "./ProductDetailRecommand";

function ProductDetail() {
  const [product, setProduct] = useState(undefined);
  const [currentColor, setCurrentColor] = useState(0);
  useEffect(() => {
    axio
      .get(`/product/${idProduct}`)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { idProduct } = useParams();

  return (
    <div>
      <div className="grid">
        <div className="product_detail">
          <div className="row">
            {product && (
              <>
                <ProductDetailImg color={product.colors[currentColor]} />
                <ProductDetailInfor
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  colors={product.colors}
                  _id={product._id}
                  currColorIndex={currentColor}
                  setColorIndex={setCurrentColor}
                />
              </>
            )}
          </div>
          <div className="row">
            <div className="product_detail--box">
              <div className="l-12">
                <div className="product_detail--box__title">
                  GIFT WRAPPING SERVICE FOR OFFICIAL ONLINE PURCHASES ONLY
                </div>
                <div className="product_detail--box__desc">
                  All shipments include protective packaging, microfiber
                  cleaning cloth, and Gentle Monster’s signature case, all
                  carefully hand packaged and topped off with a ribbon.
                </div>
                <img
                  className="img-gift"
                  src="https://res.cloudinary.com/hoanghai/image/upload/v1609159778/Radius-E/ProductDetail-Delete/products-color/gm_gift_pc_eyewear_msp8fx.webp"
                ></img>
              </div>
            </div>
          </div>
          {product && (
            <ProductDetailRecommand
              idCategory={product.categories}
              idProduct={idProduct}
              setProduct={setProduct}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
