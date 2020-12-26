import React, { useState } from "react";
import { Modal } from "antd";
import { Form } from "react-bootstrap";
function ModalUpdate({ isModalVisible, setVisible, updateProduct }) {
  const [product, setProduct] = useState(updateProduct);

  return (
    <Modal
      title="UPDATE PRODUCT"
      visible={isModalVisible}
      width={700}
      onCancel={() => setVisible(false)}>
      <Form>
        <Form.Group>
          <Form.Label>PRODUCT ID</Form.Label>
          <Form.Control type="text" value={product._id} disabled />
          <Form.Text className="text-muted">Cannot change ID</Form.Text>
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
          {product.colors.map((color, i) => {
            return (
              <div>
                <Form.Label>
                  {i + 1}:{color.color.name}
                </Form.Label>
                <div
                  style={{
                    background: `#${color.color.hex}`,
                    height: "20px",
                  }}></div>
                <img
                  width="70%"
                  className="rounded mx-auto d-block"
                  src={color.image_url}
                  alt="product"
                />
                <Form.Control
                  size="sm"
                  type="number"
                  id="quantity"
                  value={color.quantity}
                />
              </div>
            );
          })}
        </Form.Group>
      </Form>
    </Modal>
  );
}

export default ModalUpdate;
