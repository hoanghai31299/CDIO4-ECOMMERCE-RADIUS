import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../axios";

function ProductDetailRecommand({ idCategory, idProduct, setProduct }) {
  const [listProduct, setListProduct] = useState(undefined);
  const history = useHistory();
  const [listProductRCM, setListProductRCM] = useState();
  useEffect(() => {
    axios
      .get(`/product/get_category/${idCategory}`)
      .then((res) => {
        setListProduct(res.data.products);
        console.log("listproduct.........", res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleClick = () => {};
  return (
    <>
      <div className="row">
        <div className="l-12 m-12 c-12">
          <div className="product_detail-recommand">
            <div className="product_detail-recommand__title">
              ELEVATE & CULTIVATE YOUR STYLE.
            </div>
            <div className="product_detail-recommand__desc">
              Complete your chic look with frames like ALIO 01
            </div>
            <div className="product_detail-recommand__item row">
              <div className="recommand-list__item l-12 m-12 c-12">
                {!listProduct
                  ? "Loading...."
                  : listProduct.map((productRCM) => {
                      return (
                        <div className="recommand-item l-3 m-3 c-6">
                          <img
                            onClick={() => {
                              setProduct(productRCM);
                              history.push(`/product-detail/${productRCM._id}`);
                              window.scroll(0, 0);
                            }}
                            alt="img-rcm"
                            className="recommand-item__img"
                            src={productRCM.colors[0].image_url[0]}
                          />
                          <div className="recommand-item__title">
                            {productRCM.name}
                          </div>
                          <div className="recommand-item__price">
                            USD {productRCM.price}.00
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailRecommand;
