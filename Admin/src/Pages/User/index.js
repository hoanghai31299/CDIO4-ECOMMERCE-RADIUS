import React, { useEffect, useState } from "react";
import axios from "../../axios";
import Loader from "../../App/layout/Loader";
import { Form, Row, Col, Card, Button, Table } from "react-bootstrap";
import { message, Modal, Select } from "antd";
const getRole = (num) => {
  return num === 0 ? "Users" : num === 1 ? "Editor" : "Admin";
};
const { Option } = Select;
function Users() {
  const [users, setUsers] = useState(undefined);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [updated, setUpdated] = useState({});
  const [created, setCreated] = useState({});
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/user");
      if (!data.error) setUsers(data.user);
      else throw new Error(data.message);
    } catch (error) {
      message.error(error.message);
    }
  };
  const handleDelete = async (_id) => {
    try {
      const { data } = await axios.delete(`/user/${_id}`);
      if (!data.error) {
        message.success("Delete users successful");
        fetchUser();
      } else throw new Error(data.message);
    } catch (error) {
      message.error(error.message);
    }
  };
  const handleCreate = async () => {
    try {
      const { data } = await axios.post("/user/create", created);
      if (!data.error) {
        message.success("Create user successful");
        fetchUser();
        setModalCreate(false);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const handleUpdate = async () => {
    try {
      console.log(updated);
      const { data } = await axios.put(
        `/user/update_by_admin/${updated._id}`,
        updated
      );
      if (!data.error) {
        message.success(`Update user ${updated.name} successful`);
        fetchUser();
        setModalUpdate(false);
      } else throw new Error(data.message);
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };
  const handleInputOnChange = (e) => {
    setUpdated({ ...updated, [e.target.id]: e.target.value });
  };
  const handleInputCreateChange = (e) => {
    setCreated({ ...created, [e.target.id]: e.target.value });
  };
  if (users)
    return (
      <>
        <Row>
          <Col>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title as="h5">USERS</Card.Title>
                <Button
                  variant="primary"
                  onClick={() => {
                    setModalCreate(true);
                  }}>
                  + NEW USERS
                </Button>
              </Card.Header>
              <Card.Body>
                <Table className="text-center" responsive variant="dark" hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>NAME</th>
                      <th>ADDRESS</th>
                      <th>EMAIL</th>
                      <th>PHONE</th>
                      <th>ROLE</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>{u.name}</td>
                          <td style={{ maxWidth: "150px" }}>
                            <p className="text-truncate">{u.address}</p>
                          </td>
                          <td>{u.email}</td>
                          <td>{u.phone}</td>
                          <td>{getRole(u.role)}</td>
                          <td>
                            <Button
                              size="sm"
                              variant="light"
                              onClick={() => {
                                setUpdated(u);
                                setModalUpdate(true);
                              }}>
                              <i className="feather icon-edit" /> UPDATE
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleDelete(u._id)}
                              variant="danger">
                              <i className="feather icon-trash" /> DELETE
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
          title="NEW USER"
          centered
          visible={modalCreate}
          onOk={handleCreate}
          onCancel={() => setModalCreate(false)}>
          <Form>
            <Form.Group>
              <Form.Label>NAME</Form.Label>
              <Form.Control
                type="text"
                id="name"
                value={created.name}
                onChange={handleInputCreateChange}
              />
              <Form.Label>ADDRESS</Form.Label>
              <Form.Control
                as="textarea"
                id="address"
                rows={5}
                value={created.address}
                onChange={handleInputCreateChange}
              />
              <Form.Label>EMAIL</Form.Label>
              <Form.Control
                type="email"
                id="email"
                value={created.email}
                onChange={handleInputCreateChange}
              />
              <Form.Label>PASSWORD</Form.Label>
              <Form.Control
                type="password"
                id="password"
                value={created.password}
                onChange={handleInputCreateChange}
              />
              <Form.Label>PHONE</Form.Label>
              <Form.Control
                type="text"
                id="phone"
                value={created.phone}
                onChange={handleInputCreateChange}
              />
              <Form.Label>ROLE: </Form.Label>
              <Select
                defaultValue={0}
                className="m-3"
                style={{ width: 150 }}
                onChange={(value) => {
                  setCreated({ ...created, role: value });
                }}>
                <Option value={0}>User</Option>
                <Option value={1}>Editor</Option>
                <Option value={2}>Admin</Option>
              </Select>
            </Form.Group>
          </Form>
        </Modal>
        <Modal
          title="UPDATE DISCOUNT"
          centered
          visible={modalUpdate}
          onOk={handleUpdate}
          onCancel={() => setModalUpdate(false)}>
          <Form>
            <Form.Group>
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" disabled value={updated._id} />
              <Form.Label>NAME</Form.Label>
              <Form.Control
                type="text"
                id="name"
                value={updated.name}
                onChange={handleInputOnChange}
              />
              <Form.Label>DESCRIPTION</Form.Label>
              <Form.Control
                as="textarea"
                id="address"
                rows={5}
                value={updated.address}
                onChange={handleInputOnChange}
              />
              <Form.Label>EMAIL</Form.Label>
              <Form.Control
                type="email"
                id="email"
                value={updated.email}
                onChange={handleInputOnChange}
              />
              <Form.Label>PHONE</Form.Label>
              <Form.Control
                type="text"
                id="phone"
                value={updated.phone}
                onChange={handleInputOnChange}
              />
              <Form.Label>ROLE</Form.Label>
              <Select
                className="m-3"
                style={{ width: 150 }}
                onChange={(value) => {
                  setUpdated({ ...updated, role: value });
                }}>
                <Option value={0}>User</Option>
                <Option value={1}>Editor</Option>
                <Option value={2}>Admin</Option>
              </Select>
            </Form.Group>
          </Form>
        </Modal>
      </>
    );
  return <Loader />;
}

export default Users;
