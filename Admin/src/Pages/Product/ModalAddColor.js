import React, { useEffect, useState } from "react";
import { Modal, Upload, Select, message } from "antd";
import { Form } from "react-bootstrap";
import axios from "../../axios";
const { Option } = Select;

export default function ModalCreate({
  isModalVisible,
  setVisible,
  reload,
  products,
}) {
  const [newColor, setNewColor] = useState({
    image_url: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCL = (await axios.get("/color")).data;
        if (!dataCL.error) {
          setColors(dataCL.color);
        } else throw new Error(dataCL.message);
      } catch (error) {
        message.error(error.message);
      }
    };
    fetchData();
  }, []);
  const [colors, setColors] = useState([]);
  const handleFileChange = (info) => {
    const { status } = info.file;
    switch (status) {
      case "error": {
        message.error("Failed to upload file");
        break;
      }
      case "done": {
        const { image_url } = newColor;

        const newLink = info.file.response.image_url;
        setNewColor({
          ...newColor,
          image_url: [...image_url, newLink],
        });
        break;
      }

      default:
        console.log(status);
    }
  };
  const handleCreateNewColor = async () => {
    try {
      const { data } = await axios.post(
        `/product/add_color/${newColor.product}`,
        newColor
      );
      if (!data.error) {
        setVisible(false);
        reload();
        message.success("Add new color successful");
      } else throw new Error(data.message);
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <Modal
      title="ADD COLOR"
      visible={isModalVisible}
      width={700}
      onOk={handleCreateNewColor}
      onCancel={() => setVisible(false)}>
      <Form>
        <Form.Group>
          <Form.Label>Product: </Form.Label>
          <Select
            showSearch
            style={{ width: 200 }}
            onChange={(value) => {
              setNewColor({ ...newColor, product: value });
            }}
            placeholder="Select category"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {products.map((prod) => {
              return (
                <Option key={prod._id} value={prod._id}>
                  {prod.name}
                </Option>
              );
            })}
          </Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>COLORS: </Form.Label>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select color"
            onChange={(value) => {
              setNewColor({
                ...newColor,
                color: value,
              });
            }}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0
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
        </Form.Group>
        <Form.Label>Quantity: </Form.Label>
        <Form.Control
          type="number"
          id="quantity"
          onChange={(e) =>
            setNewColor({ ...newColor, quantity: e.target.value })
          }
          value={newColor.quantity}
        />
      </Form>
    </Modal>
  );
}
