import React from "react";
import { Select } from "antd";

function SelectOption({ options, render, onChange, onSearch, placeholder }) {
  console.log(options);
  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }>
      {options.map(render)}
    </Select>
  );
}

export default SelectOption;
