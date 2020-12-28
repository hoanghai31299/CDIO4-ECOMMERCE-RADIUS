import React, { useState } from "react";
import { Row, Col, Card, Table, Button, Form } from "react-bootstrap";
import { Modal, message } from "antd";
import * as moment from "moment";
import axios from "../../axios";
import Loader from "../../App/layout/Loader";
import { useEffect } from "react";
const Category = () => {
  const [cate, setCate] = useState(undefined);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [selected, setSelected] = useState({});
  const [updated, setUpdated] = useState({
    _id: "",
    name: "",
  });
  const fetchCategory = async () => {
    try {
      const { data } = await axios.get("/category");
      if (!data.error) {
        setCate(data.category);
      } else message.error(data.message);
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
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
  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(`/category/${updated._id}`, updated);
      if (!data.error) {
        message.success(data.message);
        fetchCategory();
        setShowUpdate(false);
      } else message.error(data.message);
    } catch (error) {
      message.error(error.message);
    }
  };
  const handleCreate = async () => {
    try {
      const { data } = await axios.post("/category/create", {
        name: createName,
      });
      if (!data.error) {
        message.success(data.message);
        fetchCategory();
        setShowCreate(false);
      } else message.error(data.message);
    } catch (error) {
      message.error(error.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/category/${id}`);
      if (!data.error) {
        message.success(data.message);
        fetchCategory();
      } else message.error(data.message);
    } catch (error) {
      message.error(error.message);
    }
  };
  if (cate)
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
                    {cate.map((ctg, i) => {
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
                            <Button
                              size="sm"
                              onClick={() => handleDelete(ctg._id)}
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
          title="UPDATE CATEGORY"
          centered
          visible={showUpdate}
          onOk={handleUpdate}
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
  return <Loader />;
};

export default Category;
