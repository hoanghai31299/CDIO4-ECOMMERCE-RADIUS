import React, { useContext, useEffect, useState } from "react";
import "./Product.css";
import "../StyleSheet/GridLayout.css";
import Filler from "./Filler/Filler";
import axios from "../../axios";
import ProductCard from "./ProductCard/ProductCard";
import { useParams } from "react-router-dom";
import { UserContext } from "../../GlobalState/UserContext";
function Product() {
  const { category } = useParams();
  const { user } = useContext(UserContext);
  const [filterVisible, setFilterVisible] = useState(false);
  const [products, setProducts] = useState(undefined);
  useEffect(() => {
    axios
      .get(`/product/get_category/${category}`)
      .then((res) => {
        const { data } = res;
        if (!data.error) setProducts(data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category]);

  return (
    <>
      <div className="filter-wrap">
        <div className="secondary">
          <div className="secondary-text">
            <div className="category">
              {products?.length ? products[0].categories.name : "..."}
            </div>
            <div
              className="category"
              onClick={() => setFilterVisible(!filterVisible)}
            >
              {filterVisible ? "CLOSE" : "FILTER"}
            </div>
          </div>
        </div>
        <Filler
          disabled={filterVisible}
          setFilterVisible={setFilterVisible}
          category={category}
          setProducts={setProducts}
        />
      </div>
      <div className="banner grid">
        <div className="row">
          <div className="banner-img">
            <div className="banner-img-pc">
              <img
                alt="banner"
                src="https://res.cloudinary.com/hoanghai/image/upload/v1609507588/Radius-E/ProductDetail-Delete/thumbnail/sun_banner_pc_f_rrd75v.jpg"
              />
            </div>
            {/* <div className="banner-img-mob">
              <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609507583/Radius-E/ProductDetail-Delete/thumbnail/sun_banner_mob_f_sjruf2.jpg" />
            </div> */}
          </div>
          <div className="banner-infor">
            <div className="banner-infor__title">2021 PRE-COLLECTION</div>
            <div className="banner-infor__desc">
              Radius's 2021 Pre-Collection campaign, ‘VOID’, captures the
              unbound spirit of Gentle Monster’s creativity. Immerse yourself in
              the 2021 Pre-Collection campaign filled with delicate and bold
              designs.
            </div>
          </div>
        </div>
      </div>

      <div className="product">
        <div className="gird">
          <div className="product-list">
            {products ? (
              products.length === 0 ? (
                <div className="product-not-found">
                  <img
                    alt="product-not-found"
                    src="https://res.cloudinary.com/hoanghai/image/upload/v1611124687/Radius-E/ProductDetail-Delete/icon-etc/no-products-found_x3d35a.png"
                  ></img>
                </div>
              ) : (
                products.map((prod) => {
                  return (
                    <ProductCard
                      isLike={
                        !!user.wishList?.find((pr) => pr._id === prod._id)
                      }
                      product={prod}
                    />
                  );
                })
              )
            ) : (
              <div class="loader"></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
