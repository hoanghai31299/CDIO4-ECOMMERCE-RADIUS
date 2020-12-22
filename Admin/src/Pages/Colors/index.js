import React, { useState } from "react";
import { Row, Col, Card, Table, Button, Form } from "react-bootstrap";
import { Modal } from "antd";
import * as moment from "moment";
const color = [
  {
    _id: "asdasd",
    name: "Green",
    hex: "0f0",
    createAt: new Date(),
    updateAt: new Date(),
  },
  {
    _id: "Doan xem",
    name: "Red",
    hex: "f00",
    createAt: new Date(),
    updateAt: new Date(),
  },
  {
    _id: "Doan xem",
    name: "Blue",
    hex: "00f",
    createAt: new Date(),
    updateAt: new Date(),
  },
];
const Color = () => {
  const [colors, setColors] = useState(color);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [selected, setSelected] = useState({});
  const [updated, setUpdated] = useState({
    _id: "",
    name: "",
    hex: "",
  });
  const [created, setCreated] = useState({
    _id: "",
    name: "",
    hex: "",
  });
  const handleShowUpdate = (i) => () => {
    setUpdated(colors[i]);
    setSelected(colors[i]);
    setShowUpdate(true);
  };
  const handleInputOnChange = (e) => {
    setUpdated({ ...updated, [e.target.id]: e.target.value });
  };
  const handleCreateOnChange = (e) => {
    setCreated({ ...created, [e.target.id]: e.target.value });
  };
  const handleCreate = () => {
    setColors([
      ...colors,
      {
        _id: "new",
        name: "Red",
        hex: "#123123",
        createAt: new Date(),
        updateAt: new Date(),
      },
    ]);
    setShowCreate(false);
  };
  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Card.Title as="h5">COLORS</Card.Title>
              <Button variant="primary" onClick={() => setShowCreate(true)}>
                NEW COLORS
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive variant="dark" hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>COLOR</th>
                    <th>HEX</th>
                    <th>LOOK</th>
                    <th>CREATE AT</th>
                    <th>UPDATE AT</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {colors.map((cl, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{cl._id}</td>
                        <td>{cl.name}</td>
                        <td>{cl.hex}</td>
                        <td>
                          <div
                            style={{
                              height: "20px",
                              width: "40px",
                              background: `#${cl.hex}`,
                            }}></div>
                        </td>
                        <td>{moment(cl.createAt).format("DD/MM/YYYY")}</td>
                        <td>{moment(cl.updateAt).format("DD/MM/YYYY")}</td>
                        <td>
                          <Button
                            size="sm"
                            variant="light"
                            onClick={handleShowUpdate(i)}>
                            UPDATE
                          </Button>
                          <Button size="sm" variant="danger">
                            DELETE
                          </Button>
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
      <Modal
        title="UPDATE COLOR"
        centered
        visible={showUpdate}
        onOk={() => setShowUpdate(false)}
        onCancel={() => setShowUpdate(false)}>
        <Form>
          <Form.Group>
            <Form.Label>COLOR ID</Form.Label>
            <Form.Control type="text" value={selected._id} disabled />
            <Form.Text className="text-muted">
              Cannot change CATEGORY ID
            </Form.Text>
            <Form.Label>NAME</Form.Label>
            <Form.Control
              type="text"
              id="name"
              value={updated.name}
              onChange={handleInputOnChange}
            />
            <Form.Label>HEX</Form.Label>
            <Form.Control
              type="text"
              id="hex"
              value={updated.hex}
              onChange={handleInputOnChange}
            />
            <Form.Label>LOOK</Form.Label>
            <div
              style={{ height: `20px`, backgroundColor: `#${updated.hex}` }}
            />
          </Form.Group>
        </Form>
      </Modal>
      <Modal
        title="NEW COLOR"
        centered
        visible={showCreate}
        onOk={handleCreate}
        onCancel={() => setShowCreate(false)}>
        <Form>
          <Form.Group>
            <Form.Label>NAME</Form.Label>
            <Form.Control
              type="text"
              id="name"
              value={created.name}
              onChange={handleCreateOnChange}
            />
            <Form.Label>HEX</Form.Label>
            <Form.Control
              type="text"
              id="hex"
              value={created.hex}
              onChange={handleCreateOnChange}
            />
            <Form.Label>LOOK</Form.Label>
            <div
              style={{ height: `20px`, backgroundColor: `#${created.hex}` }}
            />
          </Form.Group>
        </Form>
      </Modal>
    </>
  );
};

export default Color;
