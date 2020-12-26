import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Button, Form } from "react-bootstrap";
import { Modal, message } from "antd";
import * as moment from "moment";
import axios from "../../axios";
import Loader from "../../App/layout/Loader";
const Color = () => {
  const [colors, setColors] = useState(undefined);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [selected, setSelected] = useState({});
  const [updated, setUpdated] = useState({
    _id: "",
    name: "",
    hex: "",
  });

  const [created, setCreated] = useState({
    name: "",
    hex: "",
  });
  const fetchData = async () => {
    const colors = await (await axios.get("/color")).data.color;
    if (colors) setColors(colors);
  };
  useEffect(() => {
    fetchData();
  }, []);
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
  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(`color/${updated._id}`, {
        name: updated.name,
        hex: updated.hex,
      });
      if (!data.error) {
        message.success("Updated!");
        setShowUpdate(false);
        fetchData();
      } else message.error(data.message);
    } catch (err) {
      message.error(err.message);
      setShowCreate(false);
    }
  };
  const handleCreate = async () => {
    try {
      const { data } = await axios.post("/color/create", {
        name: created.name,
        hex: created.hex,
      });
      if (!data.error) {
        message.success("Create color successful!");
        setShowCreate(false);
        fetchData();
      } else message.error(data.message);
    } catch (err) {
      message.error(err.message);
      setShowCreate(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/color/${id}`);
      if (!data.error) {
        message.success("Delete color successful!");
        fetchData();
      } else message.error("Delete color fail!");
    } catch (err) {
      message.error(err.message);
    }
  };
  if (colors)
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
                            <Button
                              size="sm"
                              onClick={() => {
                                handleDelete(cl._id);
                              }}
                              variant="danger">
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
          onOk={handleUpdate}
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
  return <Loader />;
};

export default Color;
