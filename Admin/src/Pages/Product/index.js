import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Table } from "react-bootstrap";
import { message, Popconfirm, Select } from "antd";
import ModalCreate from "./ModalCreate";
import axios from "../../axios";
import Loader from "../../App/layout/Loader";
import ModalAddColor from "./ModalAddColor";
import { useHistory } from "react-router-dom";
const { Option } = Select;
function Product() {
  const [products, setProducts] = useState(undefined);
  const [categories, setCategories] = useState(undefined);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalAddColor, setModalAddColor] = useState(false);
  const history = useHistory();
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/product");
      if (!data.error) setProducts(data.products);
      else throw new Error(data.message);
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    fetchProducts();
    axios
      .get("/category")
      .then((res) => {
        const { data } = res;
        setCategories(data.category);
      })
      .catch((err) => message.error("Failed to get category list"));
  }, []);
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/product/${id}`);
      console.log(data);
      if (!data.error) {
        fetchProducts();
        message.success("Delete product successful");
      } else throw new Error(data.message);
    } catch (error) {
      message.error(error.message);
    }
  };
  const handleOnCategoryChange = async (value) => {
    try {
      const { data } = await axios.get(
        `/product${value ? "?categories=" + value : ""}`
      );
      if (!data.error) setProducts(data.products);
      else throw new Error(data.message);
    } catch (error) {
      message.error(error.message);
    }
  };
  if (products)
    return (
      <>
        <Row>
          <Col>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title as="h5">PRODUCT</Card.Title>
                <Select
                  defaultValue=""
                  style={{ width: 120 }}
                  onChange={handleOnCategoryChange}>
                  <Option value="">All</Option>
                  {categories &&
                    categories.map((c) => {
                      return (
                        <Option value={c._id} key={c._id}>
                          {c.name}
                        </Option>
                      );
                    })}
                </Select>
                <Row>
                  <Button
                    variant="info"
                    onClick={() => {
                      setModalAddColor(true);
                    }}>
                    + ADD COLOR
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setModalCreate(true);
                    }}>
                    + NEW PRODUCT
                  </Button>
                </Row>
              </Card.Header>
              <Card.Body>
                <Table className="text-center" responsive variant="dark" hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>NAME</th>
                      <th>PRICE</th>
                      <th>INVENTORY</th>
                      <th>SOLD</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((prod, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>
                            <img
                              height="50"
                              src={prod.colors[0].image_url[0]}
                              alt=""
                            />
                          </td>
                          <td>{prod.name}</td>
                          <td>{prod.price}$</td>
                          <td>{prod.quantity} in stock</td>
                          <td>{prod.sold}</td>
                          <td>
                            <Button size="sm" variant="info" onClick={() => {}}>
                              <i className="feather icon-eye" /> SHOW
                            </Button>
                            <Button
                              size="sm"
                              variant="light"
                              onClick={() => {
                                // setUpdateProduct(prod);
                                // setUpdateModalVS(true);
                                history.push(`/update/product/${prod._id}`);
                              }}>
                              <i className="feather icon-edit" /> UPDATE
                            </Button>
                            <Popconfirm
                              title="Are you sure?"
                              okText="Delete"
                              cancelText="Cancel"
                              onConfirm={() => handleDelete(prod._id)}>
                              <Button size="sm" variant="danger">
                                <i className="feather icon-trash" /> DELETE
                              </Button>
                            </Popconfirm>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <ModalCreate
          reload={fetchProducts}
          isModalVisible={modalCreate}
          setVisible={setModalCreate}
        />
        {products && (
          <ModalAddColor
            products={products}
            reload={fetchProducts}
            isModalVisible={modalAddColor}
            setVisible={setModalAddColor}
          />
        )}
      </>
    );
  return <Loader />;
}

export default Product;
