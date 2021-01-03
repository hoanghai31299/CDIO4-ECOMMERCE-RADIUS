import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { message, Table, Space } from "antd";
import axios from "../../axios";
import * as moment from "moment";
import Loader from "../../App/layout/Loader";
const columns = [
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    render: (text) => text + "$",
  },
  {
    title: "Last Total",
    dataIndex: "lastTotal",
    key: "lastTotal",
    render: (text) => text + "$",
  },
  {
    title: "Order Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text) => moment(new Date(text)).format("DD/MM/YYYY hh:ss"),
  },
  {
    title: "Update Date",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (text) => moment(new Date(text)).format("DD/MM/YYYY hh:ss"),
  },
  {
    title: "Action",
    dataIndex: "_id",
    key: "_id",
    render: (text) => (
      <Space size="middle">
        <Button size="sm" variant="light">
          Update
        </Button>
        <Button size="sm" variant="danger">
          Delete
        </Button>
      </Space>
    ),
  },
];
function Order() {
  const [orders, setOrders] = useState(undefined);
  // const [updated, setUpdated] = useState({})
  // const [created, setCreated] = useState({});
  // const [modalCreate, setModalCreate] = useState(false);
  // const [modalUpdate, setModalUpdate] = useState(false);
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/order");
      if (!data.error) setOrders(data.order);
      else throw new Error();
    } catch (error) {
      message.error("Failed to get orders");
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  if (orders)
    return (
      <>
        <Row>
          <Col>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title as="h5">ORDERS</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table
                  className="text-center"
                  dataSource={orders}
                  columns={columns}
                  scroll={{ x: "calc(700px + 50%)", y: 240 }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  else return <Loader />;
}

export default Order;
