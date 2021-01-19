import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Table } from "antd";
import * as moment from "moment";
import { message, Tag } from "antd";
import Aux from "../../hoc/_Aux";
import axios from "../../axios";
import Chart from "./Chart";
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
const columns = [
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
];
function Dashboard() {
  const [day, setDay] = useState(undefined);
  const [month, setMonth] = useState(undefined);
  const [year, setYear] = useState(undefined);
  const [total, setTotal] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const fetchAPI = async () => {
    try {
      const now = moment(new Date());
      const dataDay = (
        await axios.post("/order/stats/monthly", {
          start: now.startOf("day").toISOString(),
          end: now.endOf("day").toISOString(),
        })
      ).data;
      const dataMonth = (
        await axios.post("/order/stats/monthly", {
          start: now.startOf("month").toISOString(),
          end: now.endOf("month").toISOString(),
        })
      ).data;
      const dataYear = (
        await axios.post("/order/stats/monthly", {
          start: now.startOf("year").toISOString(),
          end: now.endOf("year").toISOString(),
        })
      ).data;
      const dataUser = (await axios.get("/user")).data;
      const dataTotal = (await axios.get("/order")).data;
      setDay(dataDay.orders);
      setMonth(dataMonth.orders);
      setYear(dataYear.orders);
      setTotal(dataTotal.order);
      setUser(dataUser.user);
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <Aux>
      <Row>{<Chart data={total} />}</Row>
      <Row>
        <Col md={6} xl={4}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Daily Sales</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{" "}
                    $
                    {day
                      ? day.reduce((sum, b) => {
                          return sum + b.lastTotal;
                        }, 0)
                      : "loading..."}
                  </h3>
                </div>

                <div className="col-3 text-right">
                  <p className="m-b-0">0%</p>
                </div>
              </div>
              <div className="progress m-t-30" style={{ height: "7px" }}>
                <div
                  className="progress-bar progress-c-theme"
                  role="progressbar"
                  style={{ width: "0%" }}
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Monthly Sales</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className="feather icon-arrow-down text-c-red f-30 m-r-5" />{" "}
                    $
                    {month
                      ? month.reduce((a, b) => {
                          return a + b.lastTotal;
                        }, 0)
                      : "loading..."}
                  </h3>
                </div>

                <div className="col-3 text-right">
                  <p className="m-b-0">36%</p>
                </div>
              </div>
              <div className="progress m-t-30" style={{ height: "7px" }}>
                <div
                  className="progress-bar progress-c-theme2"
                  role="progressbar"
                  style={{ width: "35%" }}
                  aria-valuenow="35"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Yearly Sales</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{" "}
                    $
                    {year
                      ? year.reduce((a, b) => {
                          return a + b.lastTotal;
                        }, 0)
                      : "loading..."}
                  </h3>
                </div>

                <div className="col-3 text-right">
                  <p className="m-b-0">70%</p>
                </div>
              </div>
              <div className="progress m-t-30" style={{ height: "7px" }}>
                <div
                  className="progress-bar progress-c-theme"
                  role="progressbar"
                  style={{ width: "70%" }}
                  aria-valuenow="70"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} xl={12}>
          <Card className="Recent-Users">
            <Card.Header>
              <Card.Title as="h5">Recent Orders</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <Table
                loading={!total}
                footer={null}
                pagination={false}
                columns={columns}
                dataSource={total ? total.reverse().slice(0, 5) : []}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} xl={6}>
          <Card className="card-event">
            <Card.Body>
              <div className="row align-items-center justify-content-center">
                <div className="col">
                  <h5 className="m-0">Total Orders</h5>
                </div>
                <div className="col-auto">
                  <label className="label theme-bg2 text-white f-14 f-w-400 float-right">
                    Beautiful
                  </label>
                </div>
              </div>
              <h2 className="mt-2 f-w-300">
                {total ? total.length : "loading"}
                <sub className="text-muted f-14">Orders</sub>
              </h2>
              <h6 className="text-muted mt-3 mb-0">Its good?</h6>
              <i className="fa fa-angellist text-c-purple f-50" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} xl={6}>
          <Card className="card-event">
            <Card.Body>
              <div className="row align-items-center justify-content-center">
                <div className="col">
                  <h5 className="m-0">Total Users</h5>
                </div>
                <div className="col-auto">
                  <label className="label theme-bg2 text-white f-14 f-w-400 float-right">
                    Beautiful
                  </label>
                </div>
              </div>
              <h2 className="mt-2 f-w-300">
                {user ? user.length : "loading"}
                <sub className="text-muted f-14">Users</sub>
              </h2>
              <h6 className="text-muted mt-3 mb-0">Its good?</h6>
              <i className="fa fa-angellist text-c-purple f-50" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
}

export default Dashboard;
