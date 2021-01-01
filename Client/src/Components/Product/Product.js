import React from "react";
import "./Product.css";
import "../StyleSheet/GridLayout.css";
function Product() {
  return (
    <>
      <div className="secondary">
        <div className="secondary-text">
          <div className="category">Sun glass</div>
          <div className="filler">
            <div className="filer-open">Filler</div>
            <div className="filer-close">Close</div>
          </div>
        </div>
        <div className="secondary-filler">
          <div className="econdary-filler__color">
            <div className="color-title">COLOR</div>
            <div className="list_item-color">
              <div className="item-color">
                <span class="colorchip-item">
                  <label for="color-item"></label>
                  <input
                    type="checkbox"
                    name="fame_color"
                    value="black"
                    id="color-item"
                  />
                </span>
              </div>
              <div className="item-color">
                <span class="colorchip-item">
                  <input
                    type="checkbox"
                    name="fame_color"
                    value="black"
                    id="color-item"
                  />
                  <label for="color-item"></label>
                </span>
              </div>
              <div className="item-color">
                <span class="colorchip-item">
                  <input
                    type="checkbox"
                    name="fame_color"
                    value="black"
                    id="color-item"
                  />
                  <label for="color-item"></label>
                </span>
              </div>
              <div className="item-color">
                <span class="colorchip-item">
                  <input
                    type="checkbox"
                    name="fame_color"
                    value="black"
                    id="color-item"
                  />
                  <label for="color-item"></label>
                </span>
              </div>
            </div>
          </div>
          <div className="secondary-filler__sort_by">
            <div className="sort_by-title">SORT BY</div>
            <div className="sort_by_element">
              <input type="radio" name="sort_by" value="price_hight" />
              <label className="price-hight">Price Hight</label>
            </div>
            <div className="sort_by_element">
              <input type="radio" name="sort_by" value="price_low" />
              <label className="price-low">Price Low</label>
            </div>
          </div>
        </div>
      </div>
      <div className="thumbnail grid">
        <div className="row">
          <div className="banner-ing">
            <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609507588/Radius-E/ProductDetail-Delete/thumbnail/sun_banner_pc_f_rrd75v.jpg"></img>
          </div>
          <div className="banner-infor">
            <div className="banner-infor__title">2021 PRE-COLLECTION</div>
            <div className="banner-infor__desc">
              Gentle Monster’s 2021 Pre-Collection campaign, ‘VOID’, captures
              the unbound spirit of Gentle Monster’s creativity. Immerse
              yourself in the 2021 Pre-Collection campaign filled with delicate
              and bold designs.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
