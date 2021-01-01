import React, { useEffect, useState } from "react";
import { Modal, Upload, Select, message } from "antd";
import { Form } from "react-bootstrap";
import axios from "../../axios";
const { Option } = Select;

export default function ModalCreate({ isModalVisible, setVisible, reload }) {
  const [product, setProduct] = useState({
    categories: "",
    name: "",
    price: 0,
    description: {
      main: "",
      sku: "",
      size: "",
    },
    colors: {
      color: "",
      quantity: 0,
      image_url: [],
    },
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
    const { status } = info.file;
    console.log(info);
    switch (status) {
      case "error": {
        message.error("Failed to upload file");
        break;
      }
      case "done": {
        const { colors } = product;
        const { image_url } = colors;

        const newLink = info.file.response.image_url;
        setProduct({
          ...product,
          colors: { ...colors, image_url: [...image_url, newLink] },
        });
        break;
      }

      default:
        console.log(status);
    }
  };
  const handleCreateProduct = async () => {
    try {
      const { data } = await axios.post("/product/create", product);
      if (!data.error) {
        setVisible(false);
        message.success("Create product successful");
      } else throw new Error(data.message);
    } catch (error) {
      message.error(error.message);
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
              setProduct({ ...product, categories: value });
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
              className="mt-2"
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
              className="mt-2"
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
                  colors: { ...product.colors, color: value },
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
              method="POST"
              action="http://localhost:5000/product/up_image"
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
            <Form.Control
              size="sm"
              type="text"
              className="mt-2"
              placeholder="quantity"
              onChange={(e) => {
                setProduct({
                  ...product,
                  colors: { ...product.colors, quantity: e.target.value },
                });
              }}
              value={product.colors.value}
            />
          </Form.Group>
        </Form.Group>
      </Form>
    </Modal>
  );
}
