import React, { useEffect, useState } from "react";
import axios from "../../../axios";
function Filler({ disabled, setFilterVisible, category, setProducts }) {
  const [colors, setColors] = useState(undefined);
  const [selectColor, setSelectColor] = useState(undefined);
  const [sort, setSort] = useState("");
  useEffect(() => {
    axios
      .get("/color")
      .then((res) => {
        const { data } = res;
        if (!data.error) setColors(data.color);
      })
      .catch((err) => console.log(err));
  }, []);
  const onApplyFilter = () => {
    axios
      .get(`/product?color=${selectColor}&sort=${sort}&categories=${category}`)
      .then((res) => {
        console.log(res);
        setProducts(res.data.products);
        setFilterVisible(false);
      });
  };
  return (
    <>
      <div className={`section-seach ${!disabled && "disabled"}`}>
        <div className="secondary-filler">
          <div className="econdary-filler__color">
            <div className="color-title">COLOR</div>
            <div className="list_item-color">
              {colors &&
                colors.map((cl, i) => (
                  <div className="item-color">
                    <span
                      onClick={() => setSelectColor(cl._id)}
                      class={`colorchip-item${
                        cl._id === selectColor ? " select" : ""
                      }`}>
                      <label
                        style={{
                          background: `#${cl.hex}`,
                        }}></label>
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <div className="secondary-filler__sort_by">
            <div className="sort_by-group">
              <div className="sort_by-title">SORT BY</div>
              <div className="sort_by_element">
                <input
                  onClick={() => setSort("-price")}
                  type="radio"
                  name="sort_by"
                  value="price_hight"
                />
                <label className="price-hight">Price-High</label>
              </div>
              <div className="sort_by_element">
                <input
                  onClick={() => setSort("+price")}
                  type="radio"
                  name="sort_by"
                  value="price_low"
                />
                <label className="price-low">Price-Low</label>
              </div>
            </div>
          </div>
        </div>
        <div className="secondary-button">
          <div className="secondary-button_clear">CLEAR</div>
          <div className="secondary-button_apply" onClick={onApplyFilter}>
            APPLY
          </div>
        </div>
      </div>
    </>
  );
}

export default Filler;
