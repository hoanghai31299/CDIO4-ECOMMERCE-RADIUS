import React, { useState } from "react";
import { Row, Col, Card, Table, Button, Form } from "react-bootstrap";
import { Modal } from "antd";
import * as moment from "moment";
const category = [
  {
    _id: "asdasd",
    name: "Glasses",
    createAt: new Date(),
    updateAt: new Date(),
  },
  {
    _id: "Doan xem",
    name: "Fashion Glasses",
    createAt: new Date(),
    updateAt: new Date(),
  },
  {
    _id: "Doan xem",
    name: "Beautiful Glass",
    createAt: new Date(),
    updateAt: new Date(),
  },
];
const Category = () => {
  const [cate, setCate] = useState(category);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [selected, setSelected] = useState({});
  const [updated, setUpdated] = useState({
    _id: "",
    name: "",
  });
  const [createName, setCreateName] = useState("");
  const handleShowUpdate = (i) => () => {
    setUpdated({
      _id: cate[i]._id,
      name: cate[i].name,
    });
    setSelected(cate[i]);
    setShowUpdate(true);
  };
  const handleInputOnChange = (e) => {
    setUpdated({ ...updated, [e.target.id]: e.target.value });
  };
  const handleCreate = () => {
    setCate([
      ...cate,
      {
        _id: "new",
        name: createName,
        createAt: new Date(),
        updateAt: new Date(),
      },
    ]);
    console.log(cate);
    setShowCreate(false);
  };
  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Card.Title as="h5">CATEGORY</Card.Title>
              <Button variant="primary" onClick={() => setShowCreate(true)}>
                NEW CATEGORY
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive variant="dark" hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>CREATE AT</th>
                    <th>UPDATE AT</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((ctg, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{ctg._id}</td>
                        <td>{ctg.name}</td>
                        <td>{moment(ctg.createAt).format("DD/MM/YYYY")}</td>
                        <td>{moment(ctg.updateAt).format("DD/MM/YYYY")}</td>
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
        title="UPDATE CATEGORY"
        centered
        visible={showUpdate}
        onOk={() => setShowUpdate(false)}
        onCancel={() => setShowUpdate(false)}>
        <Form>
          <Form.Group>
            <Form.Label>CATEGORY ID</Form.Label>
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
          </Form.Group>
        </Form>
      </Modal>
      <Modal
        title="NEW CATEGORY"
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
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal>
    </>
  );
};

export default Category;
