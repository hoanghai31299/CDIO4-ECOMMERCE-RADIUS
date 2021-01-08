import React, { useEffect, useState } from "react";
import axios from "../../../axios";
function Filler({ disabled }) {
  const [colors, setColors] = useState(undefined);

  useEffect(() => {
    axios
      .get("/color")
      .then((res) => {
        const { data } = res;
        if (!data.error) setColors(data.color);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className={`section-seach ${!disabled && "disabled"}`}>
        <div className="secondary-filler">
          <div className="econdary-filler__color">
            <div className="color-title">COLOR</div>
            <div className="list_item-color">
              {colors &&
                colors.map((cl) => (
                  <div className="item-color">
                    <span class="colorchip-item">
                      <label
                        for="color-item"
                        style={{
                          background: `#${cl.hex}`,
                        }}
                      ></label>
                      <input
                        type="checkbox"
                        name="fame_color"
                        value="black"
                        id="color-item"
                      />
                    </span>
                  </div>
                ))}
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
    </>
  );
}

export default Filler;
