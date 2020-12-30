import React from "react";
import "../StyleSheet/GridLayout.css";
import "./ProductDetail.css";
const arrProductImg = [
  {
    url:
      "https://res.cloudinary.com/hoanghai/image/upload/v1609098368/Radius-E/ProductDetail-Delete/ALIO_01_1_hpojc0.webp",
    active: false,
  },
  {
    url:
      "https://res.cloudinary.com/hoanghai/image/upload/v1609098368/Radius-E/ProductDetail-Delete/ALIO_01_3_mroqma.webp",
    active: false,
  },
  {
    url:
      "https://res.cloudinary.com/hoanghai/image/upload/v1609098368/Radius-E/ProductDetail-Delete/ALIO_01_4_wfxuqw.webp",
    active: false,
  },
  {
    url:
      "https://res.cloudinary.com/hoanghai/image/upload/v1609098371/Radius-E/ProductDetail-Delete/ALIO_01_GD_d7uhiw.webp",
    active: false,
  },
  {
    url:
      "https://res.cloudinary.com/hoanghai/image/upload/v1609098371/Radius-E/ProductDetail-Delete/ALIO_01_SV_fi9bkn.webp",
    active: false,
  },
];
function ProductDetail() {
  const [images, setImages] = React.useState(arrProductImg);
  const [imageBig, setImageBig] = React.useState(arrProductImg[0].url);
  const arrProductColor = [
    "https://res.cloudinary.com/hoanghai/image/upload/v1609154966/Radius-E/ProductDetail-Delete/products-color/m_ALIO_01_1_b26ezr.webp",
    "https://res.cloudinary.com/hoanghai/image/upload/v1609154963/Radius-E/ProductDetail-Delete/products-color/m_ALIO_C1_1_ozunvl.webp",
    "https://res.cloudinary.com/hoanghai/image/upload/v1609154963/Radius-E/ProductDetail-Delete/products-color/m_ALIO_GD1_1_e3j4vk.webp",
  ];
  const arrowRight =
    "https://res.cloudinary.com/hoanghai/image/upload/v1609105929/Radius-E/Img-Arrow/chevron-right-solid_tvmgry.svg";
  const arrowLeft =
    "https://res.cloudinary.com/hoanghai/image/upload/v1609105930/Radius-E/Img-Arrow/chevron-left-solid_l27mcw.svg";
  const handleClick = (index) => {
    console.log(index);
    const newImages = [...images];
    for (let image of newImages) {
      image.active = false;
    }
    newImages[index].active = true;
    setImageBig(images[index].url);
    setImages(newImages);
  };

  const loadImgColor = () => {};
  return (
    <div>
      <div className="grid wide">
        <div className="product_detail">
          <div className="row">
            <div className="product_detail--img l-7">
              <img id="featured" src={imageBig} />
              <div id="product_detail--img__wrap">
                <img id="slide-left" className="arrow" src={arrowLeft} />
                <div id="img-slider">
                  {images.map((image, index) => {
                    console.log(image);
                    return (
                      <img
                        onClick={(e) => handleClick(index)}
                        className={
                          image.active ? "img-item image-active" : "img-item"
                        }
                        src={image.url}
                      />
                    );
                  })}
                </div>
                <img id="slide-right" className="arrow" src={arrowRight} />
              </div>
            </div>
            <div className="product_detail--info l-5">
              <div className="product_detail--info__section">
                <div className="product_detail-title">Ten san pham</div>
                <div className="product_detail-price">Gia tiền : 119usd</div>
                <div className="product_detail-desc">
                  The Alio 01 is a semi-rimless frame composed of black acetate
                  and silver grooved metal lining. This style offers a slimmer
                  alternative to our previous best seller, the Ell, to create a
                  lighter and sleeker look.
                </div>
                <div className="product_detail-color">
                  <p className="color">Color(số lượng màu kính)</p>
                  <div className="img-product__color">
                    {arrProductColor.map((imgColor) => {
                      return (
                        <img className="img_color-number" src={imgColor} />
                      );
                    })}
                  </div>
                </div>
                <div className="product_detail-button">
                  <div className="button-select_clip">
                    <select id="option-other" className="storelocator_select">
                      <option value="sliver">SLIVER + 60 USD</option>
                      <option value="gold">GOLD + 60 USD</option>
                      <option value="audi" selected>
                        Select Clip
                      </option>
                    </select>
                  </div>
                  <div className="button-add_to_bag">ADD TO SHOPPING BAG</div>
                </div>
              </div>
              <div className="product_detail-etc">
                <div className="product_detail-specifications">
                  <img
                    className="icon-etc"
                    src="https://res.cloudinary.com/hoanghai/image/upload/v1609183315/Radius-E/ProductDetail-Delete/icon-etc/ruler-horizontal-solid_bwf49d.svg"
                  />
                  <p>
                    Frame Front 138.0mm, Frame Side 145.0mm, Lens Width 49.4mm,
                    Lens Height 43.2mm
                  </p>
                </div>
                <div className="product_detail--origin">
                  <img
                    className="icon-etc"
                    src="https://res.cloudinary.com/hoanghai/image/upload/v1609183316/Radius-E/ProductDetail-Delete/icon-etc/industry-solid_hogsny.svg"
                  />
                  <p>
                    Manufacturer: Jingwei Optical (Huizhou) Co.,Ltd., Great
                    Dragon Optical (FuJian) Co.,Ltd. Made in China Importer:
                    IICOMBINED Co., Ltd.
                  </p>
                </div>
                <div className="product_detail--shipping">
                  <img
                    className="icon-etc"
                    src="https://res.cloudinary.com/hoanghai/image/upload/v1609183315/Radius-E/ProductDetail-Delete/icon-etc/truck-solid_fs22j6.svg"
                  />
                  <p>
                    Shipping • Free express shipping with a minimum purchase of
                    $190 and above • Import duties information Delivery duties
                    are included in the item price when shipping to Canada,
                    France, Germany, Italy, Japan, Singapore, Taiwan, Thailand,
                    United Arab Emirates, United Kingdom. All import duties are
                    included in your order – the price you see is the price you
                    pay.
                  </p>
                </div>
              </div>
            </div>
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
                    <div className="recommand-item l-3 m-3 c-6">
                      <img
                        className="recommand-item__img"
                        src="https://res.cloudinary.com/hoanghai/image/upload/v1609098371/Radius-E/ProductDetail-Delete/ALIO_01_GD_d7uhiw.webp"
                      />
                      <div className="recommand-item__title">
                        Ten san pham 1
                      </div>
                      <div className="recommand-item__price">Gia ban:123</div>
                    </div>
                    <div className="recommand-item l-3 m-3 c-6">
                      <img
                        className="recommand-item__img"
                        src="https://res.cloudinary.com/hoanghai/image/upload/v1609098371/Radius-E/ProductDetail-Delete/ALIO_01_SV_fi9bkn.webp"
                      />
                      <div className="recommand-item__title">
                        Ten san pham 1
                      </div>
                      <div className="recommand-item__price">Gia ban:123</div>
                    </div>
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

export default ProductDetail;
