import React from "react";
import "./Product.css";
import "../StyleSheet/GridLayout.css";
function Product() {
  return (
    <>
      <div className="secondary">
        <div className="secondary-text">
          <div className="category">SUNGLASS</div>
          <div className="filler">
            <input
              className="check-open-close"
              type="checkbox"
              id="checkfiller"
            />
            <label for="checkfiller" className="filler-open">
              FILLER
            </label>
            <label for="checkfiller" className="filler-close">
              CLOSE
            </label>
          </div>
        </div>
        <div className="section-seach">
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
              <div className="sort_by-group">
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
          <div className="secondary-button">
            <div className="secondary-button_clear">CLEAR</div>
            <div className="secondary-button_apply">APPLY</div>
          </div>
        </div>
      </div>
      <div className="banner grid">
        <div className="row">
          <div className="banner-img">
            <div className="banner-img-pc">
              <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609507588/Radius-E/ProductDetail-Delete/thumbnail/sun_banner_pc_f_rrd75v.jpg" />
            </div>
            {/* <div className="banner-img-mob">
              <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609507583/Radius-E/ProductDetail-Delete/thumbnail/sun_banner_mob_f_sjruf2.jpg" />
            </div> */}
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
      <div className="product">
        <div className="gird wide">
          <div className="product-list">
            {/* <div className="product-item">
              <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609518181/Radius-E/ProductDetail-Delete/thumbnail/3_OP_2020COLLECTION_PC_final_wirdya.jpg" />
            </div> */}
            <div className="product-item">
              <div className="product-img">
                <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609519592/Radius-E/ProductDetail-Delete/product/m_ALIO_GD1_1_z6bn6u.webp"></img>
              </div>
              <div className="favorite-icon">
                <div className="favorite-icon__off">
                  <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609597115/Radius-E/ProductDetail-Delete/icon-heart/heart-regular_umpjua.svg" />
                </div>
                <div className="favorite-icon__on">
                  <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609597114/Radius-E/ProductDetail-Delete/icon-heart/heart-solid_ovskat.svg" />
                </div>
              </div>
              <div className="product-infor">
                <div className="product-name">ALIO C1</div>
                <div className="product-color-list">
                  <div className="product-color-item">
                    <span className="product-chip-color-item">
                      <input
                        type="checkbox"
                        name="color-product"
                        id="product-color-item"
                      />
                      <label for="product-color-item"></label>
                    </span>
                  </div>
                  <div className="product-color-item">
                    <span className="product-chip-color-item">
                      <input
                        type="checkbox"
                        name="color-product"
                        id="product-color-item"
                      />
                      <label for="product-color-item"></label>
                    </span>
                  </div>
                </div>
                <div className="product-price">USD 230.00</div>
              </div>
            </div>
            <div className="product-item">
              <div className="product-img">
                <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609519592/Radius-E/ProductDetail-Delete/product/m_ALIO_GD1_1_z6bn6u.webp"></img>
              </div>
              <div className="favorite-icon">
                <div className="favorite-icon__off">
                  <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609597115/Radius-E/ProductDetail-Delete/icon-heart/heart-regular_umpjua.svg" />
                </div>
                <div className="favorite-icon__on">
                  <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609597114/Radius-E/ProductDetail-Delete/icon-heart/heart-solid_ovskat.svg" />
                </div>
              </div>
              <div className="product-infor">
                <div className="product-name">ALIO C1</div>
                <div className="product-color-list">
                  <div className="product-color-item">
                    <span className="product-chip-color-item">
                      <input
                        type="checkbox"
                        name="color-product"
                        id="product-color-item"
                      />
                      <label for="product-color-item"></label>
                    </span>
                  </div>
                  <div className="product-color-item">
                    <span className="product-chip-color-item">
                      <input
                        type="checkbox"
                        name="color-product"
                        id="product-color-item"
                      />
                      <label for="product-color-item"></label>
                    </span>
                  </div>
                </div>
                <div className="product-price">USD 230.00</div>
              </div>
            </div>
            <div className="product-item">
              <div className="product-img">
                <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609519592/Radius-E/ProductDetail-Delete/product/m_ALIO_GD1_1_z6bn6u.webp"></img>
              </div>
              <div className="favorite-icon">
                <div className="favorite-icon__off">
                  <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609597115/Radius-E/ProductDetail-Delete/icon-heart/heart-regular_umpjua.svg" />
                </div>
                <div className="favorite-icon__on">
                  <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609597114/Radius-E/ProductDetail-Delete/icon-heart/heart-solid_ovskat.svg" />
                </div>
              </div>
              <div className="product-infor">
                <div className="product-name">ALIO C1</div>
                <div className="product-color-list">
                  <div className="product-color-item">
                    <span className="product-chip-color-item">
                      <input
                        type="checkbox"
                        name="color-product"
                        id="product-color-item"
                      />
                      <label for="product-color-item"></label>
                    </span>
                  </div>
                  <div className="product-color-item">
                    <span className="product-chip-color-item">
                      <input
                        type="checkbox"
                        name="color-product"
                        id="product-color-item"
                      />
                      <label for="product-color-item"></label>
                    </span>
                  </div>
                </div>
                <div className="product-price">USD 230.00</div>
              </div>
            </div>
            <div className="product-item">
              <div className="product-img">
                <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609519592/Radius-E/ProductDetail-Delete/product/m_ALIO_GD1_1_z6bn6u.webp"></img>
              </div>
              <div className="favorite-icon">
                <div className="favorite-icon__off">
                  <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609597115/Radius-E/ProductDetail-Delete/icon-heart/heart-regular_umpjua.svg" />
                </div>
                <div className="favorite-icon__on">
                  <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609597114/Radius-E/ProductDetail-Delete/icon-heart/heart-solid_ovskat.svg" />
                </div>
              </div>
              <div className="product-infor">
                <div className="product-name">ALIO C1</div>
                <div className="product-color-list">
                  <div className="product-color-item">
                    <span className="product-chip-color-item">
                      <input
                        type="checkbox"
                        name="color-product"
                        id="product-color-item"
                      />
                      <label for="product-color-item"></label>
                    </span>
                  </div>
                  <div className="product-color-item">
                    <span className="product-chip-color-item">
                      <input
                        type="checkbox"
                        name="color-product"
                        id="product-color-item"
                      />
                      <label for="product-color-item"></label>
                    </span>
                  </div>
                </div>
                <div className="product-price">USD 230.00</div>
              </div>
            </div>
            <div className="product-item">
              <div className="product-img">
                <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609519592/Radius-E/ProductDetail-Delete/product/m_ALIO_GD1_1_z6bn6u.webp"></img>
              </div>
              <div className="favorite-icon">
                <div className="favorite-icon__off">
                  <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609597115/Radius-E/ProductDetail-Delete/icon-heart/heart-regular_umpjua.svg" />
                </div>
                <div className="favorite-icon__on">
                  <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609597114/Radius-E/ProductDetail-Delete/icon-heart/heart-solid_ovskat.svg" />
                </div>
              </div>
              <div className="product-infor">
                <div className="product-name">ALIO C1</div>
                <div className="product-color-list">
                  <div className="product-color-item">
                    <span className="product-chip-color-item">
                      <input
                        type="checkbox"
                        name="color-product"
                        id="product-color-item"
                      />
                      <label for="product-color-item"></label>
                    </span>
                  </div>
                  <div className="product-color-item">
                    <span className="product-chip-color-item">
                      <input
                        type="checkbox"
                        name="color-product"
                        id="product-color-item"
                      />
                      <label for="product-color-item"></label>
                    </span>
                  </div>
                </div>
                <div className="product-price">USD 230.00</div>
              </div>
            </div>
            <div className="product-item">
              <div className="product-img">
                <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609519592/Radius-E/ProductDetail-Delete/product/m_ALIO_GD1_1_z6bn6u.webp"></img>
              </div>
              <div className="favorite-icon">
                <div className="favorite-icon__off">
                  <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609597115/Radius-E/ProductDetail-Delete/icon-heart/heart-regular_umpjua.svg" />
                </div>
                <div className="favorite-icon__on">
                  <img src="https://res.cloudinary.com/hoanghai/image/upload/v1609597114/Radius-E/ProductDetail-Delete/icon-heart/heart-solid_ovskat.svg" />
                </div>
              </div>
              <div className="product-infor">
                <div className="product-name">ALIO C1</div>
                <div className="product-color-list">
                  <div className="product-color-item">
                    <span className="product-chip-color-item">
                      <input
                        type="checkbox"
                        name="color-product"
                        id="product-color-item"
                      />
                      <label for="product-color-item"></label>
                    </span>
                  </div>
                  <div className="product-color-item">
                    <span className="product-chip-color-item">
                      <input
                        type="checkbox"
                        name="color-product"
                        id="product-color-item"
                      />
                      <label for="product-color-item"></label>
                    </span>
                  </div>
                </div>
                <div className="product-price">USD 230.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
