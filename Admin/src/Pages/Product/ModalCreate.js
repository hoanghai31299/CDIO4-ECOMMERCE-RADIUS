import React, { useEffect, useState } from "react";
import { Modal, Upload, Select, message } from "antd";
import { Form } from "react-bootstrap";
import axios from "../../axios";
import FormData from "form-data";
const { Option } = Select;
const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};
function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;

    formData.append(parentKey, value);
  }
}
function jsonToFormData(data) {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
}
export default function ModalCreate({ isModalVisible, setVisible, reload }) {
  const [product, setProduct] = useState({
    category: "",
    name: "",
    price: 0,
    description: {
      main: "",
      sku: "",
      size: "",
    },
    color: {
      color: "",
      quantity: 100,
    },
    productImage: {},
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCL = (await axios.get("/color")).data;
        const dataCT = (await axios.get("/category")).data;
        if (!dataCL.error && !dataCT.error) {
          setColors(dataCL.color);
          setCategories(dataCT.category);
        } else throw new Error(dataCL.message);
      } catch (error) {
        message.error(error.message);
      }
    };
    fetchData();
  }, []);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const handleFileChange = (info) => {
    setProduct({
      ...product,
      productImage: info.file,
    });
  };
  const handleCreateProduct = async () => {
    try {
      console.log(product);
      console.log(jsonToFormData(product));
      let formData = jsonToFormData(product);
      formData.append("productImage", product.productImage);
      const { data } = await axios.post("/product/create", formData, {
        headers: {
          "content-type":
            "multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s",
        },
      });
      console.log(data);
      if (!data.error) {
        reload();
        message.success("Create product successful");
      } else throw new Error(data.message);
    } catch (error) {
      message.error(error.message);
      console.log(error);
    }
  };
  return (
    <Modal
      title="CREATE PRODUCT"
      visible={isModalVisible}
      width={700}
      onOk={handleCreateProduct}
      onCancel={() => setVisible(false)}>
      <Form>
        <Form.Group>
          <Form.Label>CATEGORY: </Form.Label>
          <Select
            showSearch
            style={{ width: 200 }}
            onChange={(value) => {
              setProduct({ ...product, category: value });
            }}
            placeholder="Select category"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {categories.map((ctg) => {
              return (
                <Option key={ctg._id} value={ctg._id}>
                  {ctg.name}
                </Option>
              );
            })}
          </Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>NAME</Form.Label>

          <Form.Control
            type="text"
            id="name"
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            value={product.name}
          />
          <Form.Group>
            <Form.Label>DESCRIPTION</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="main"
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: { ...product.description, main: e.target.value },
                });
              }}
              value={product.description.main}
            />

            <Form.Control
              size="sm"
              type="text"
              placeholder="size"
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: { ...product.description, size: e.target.value },
                });
              }}
              value={product.description.size}
            />
            <Form.Control
              size="sm"
              type="text"
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: { ...product.description, sku: e.target.value },
                });
              }}
              placeholder="SKU"
              value={product.description.sku}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>PRICE</Form.Label>
            <Form.Control
              type="number"
              id="price"
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              value={product.price}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>COLORS: </Form.Label>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select color"
              onChange={(value) => {
                setProduct({
                  ...product,
                  color: { ...product.color, color: value },
                });
              }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children[0].toLowerCase().indexOf(input.toLowerCase()) >=
                0
              }>
              {colors.map((color) => {
                return (
                  <Option value={color._id} key={color._id}>
                    {color.name}{" "}
                    <div
                      style={{
                        background: `#${color.hex}`,
                        height: "20px",
                      }}></div>
                  </Option>
                );
              })}
            </Select>
            <Upload.Dragger
              name="productImage"
              multiple={false}
              customRequest={dummyRequest}
              accept=".jpg"
              onChange={(info) => {
                handleFileChange(info);
              }}>
              <p className="ant-upload-drag-icon">
                <i className="feather icon-upload" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload product image
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload (only file jpg).
              </p>
            </Upload.Dragger>
          </Form.Group>
        </Form.Group>
      </Form>
    </Modal>
  );
}
