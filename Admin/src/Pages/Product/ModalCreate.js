import React, { useState } from "react";
import { Modal, Upload } from "antd";
import { Form } from "react-bootstrap";
export default function ModalCreate({ isModalVisible, setVisible }) {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: {
      main: "",
      sku: "",
      size: "",
    },
    color: [],
  });

  return (
    <Modal
      title="CREATE PRODUCT"
      visible={isModalVisible}
      width={700}
      onCancel={() => setVisible(false)}>
      <Form>
        <Form.Group>
          <Form.Label>NAME</Form.Label>
          <Form.Control
            type="text"
            id="name"
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            value={product.name}
          />
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
          <Form.Label>PRICE</Form.Label>
          <Form.Control
            type="number"
            id="price"
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            value={product.price}
          />
          <Form.Label>COLORS</Form.Label>
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <i className="feather icon-upload" />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Upload.Dragger>
        </Form.Group>
      </Form>
    </Modal>
  );
}
