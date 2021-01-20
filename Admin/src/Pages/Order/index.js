import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { message, Button, Table, Space, Tag, Popconfirm } from "antd";
import axios from "../../axios";
import * as moment from "moment";
import Loader from "../../App/layout/Loader";
const status = [
  {
    title: "Need Confirm",
    color: "red",
  },
  {
    title: "Confirmed",
    color: "lightgreen",
  },
  {
    title: "Delivering",
    color: "green",
  },
  {
    title: "Deliveried",
    color: "lightblue",
  },
];

function Order() {
  const [orders, setOrders] = useState(undefined);
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (st) => (
        <Tag color={status[st].color} key={"12"}>
          {status[st].title.toUpperCase()}
        </Tag>
      ),
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
      fixed: "right",
      render: (text, order) => (
        <Space size="middle">
          {order.status < 3 ? (
            <Button
              onClick={() => handleUpdateOrder(order)}
              type="default"
              style={{
                borderColor: status[order.status + 1].color,
              }}>
              {status[order.status + 1].title}
            </Button>
          ) : (
            <Button type="dashed">Done</Button>
          )}
          <Popconfirm
            title="Are you sure?"
            okText="OK"
            onConfirm={() => handleDelete(order._id)}
            cancelText="Cancel">
            <Button size="sm" variant="danger">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleDelete = (id) => {
    axios
      .delete(`/order/${id}`)
      .then((res) => {
        if (!res.data.error) {
          fetchOrders();
          message.success("Deleted");
        } else throw new Error("fail to delete the order");
      })
      .catch((err) => message.error(err.message));
  };
  const handleUpdateOrder = (order, status) => {
    if (status === 3) return;
    axios
      .put(`/order/${order._id}`, { ...order, status: order.status + 1 })
      .then((res) => {
        if (!res.data.error) {
          fetchOrders();
          message.success("Updated");
        } else throw new Error("fail to update order");
      })
      .catch((err) => message.error(err.message));
  };
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
                  loading={!orders}
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
