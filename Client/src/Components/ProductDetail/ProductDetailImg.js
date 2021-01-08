import React, { useState, useEffect } from "react";

function ProductDetaiImg({ color }) {
  const [currentImgIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [color]);
  return (
    <>
      <div className="product_detail--img l-8">
        <img id="featured" src={color.image_url[currentImgIndex]} />
        <div id="product_detail--img__wrap">
          <div id="img-slider">
            {color.image_url.map((image, index) => {
              return (
                <img
                  key={index}
                  onClick={(e) => setCurrentImageIndex(index)}
                  className={
                    index === currentImgIndex
                      ? "img-item image-active"
                      : "img-item"
                  }
                  src={image}
                  alt="prod"
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetaiImg;
