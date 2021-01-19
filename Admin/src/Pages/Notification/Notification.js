import { message, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { Form, Row, Col, Card, Table, Button } from "react-bootstrap";
import axios from "../../axios";
import { Modal, Select } from "antd";
import Loading from "../../App/layout/Loader";
const { Option } = Select;

export default function Notification() {
  const [noti, setNoti] = useState([]);
  const [updated, setUpdated] = useState({
    _id: "",
    title: "",
    information: "",
    users: [],
  });
  const [created, setCreated] = useState({
    title: "",
    information: "",
    users: [],
  });

  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [users, setUsers] = useState([]);
  const handleShowUpdate = async (notification) => {
    await setUpdated({
      ...notification,
      users: notification.users.map((u) => u._id),
    });
    await setShowUpdate(true);
  };
  const handleInputCreateChange = (e) => {
    setCreated({ ...created, [e.target.id]: e.target.value });
  };
  const handleCreate = async () => {
    try {
      const { data } = await axios.post(`notification/create`, created);
      if (!data.error) {
        fetchNotifications();
        message.success("Create notification successful");
        setShowCreate(false);
      } else throw new Error(data.message);
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };
  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(`notification/${updated._id}`, updated);
      if (!data.error) {
        fetchNotifications();
        message.success("Updated");
        setShowUpdate(false);
      } else throw new Error(data.message);
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };
  const handleInputOnChange = (e) => {
    setUpdated({ ...updated, [e.target.id]: e.target.value });
  };
  const handleSelectUser = (value) => {
    setUpdated({ ...updated, users: value });
  };
  const handleDeselectUser = (value) => {
    if (value.length === 0)
      setUpdated({
        ...updated,
        users: [],
      });
    else
      setUpdated({
        ...updated,
        users: value,
      });
  };
  const handleDelete = async (_id) => {
    try {
      const { data } = await axios.delete(`notification/${_id}`);
      if (!data.error) {
        fetchNotifications();
        message.success("Delete notification successful");
      } else throw new Error(data.message);
    } catch (error) {
      message.error(error.message);
    }
  };
  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get("/notification");
      if (!data.error) {
        setNoti(data.notification);
      }
    } catch (error) {
      message.error(error.message);
    }
    try {
      const { data } = await axios.get("/user");
      setUsers(data.user);
    } catch (error) {
      message.error("Get users failed");
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);
  if (noti)
    return (
      <>
        <Row>
          <Col>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title as="h5">NOTIFICATIONS</Card.Title>
                <Button variant="primary" onClick={() => setShowCreate(true)}>
                  + NEW NOTIFICATION
                </Button>
              </Card.Header>
              <Card.Body>
                <Table responsive variant="dark" hover className="text-center">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ID</th>
                      <th>TITLE</th>
                      <th>INFO</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {noti.map((n, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>{n._id}</td>
                          <td>{n.title}</td>
                          <td style={{ maxWidth: "150px" }}>
                            <p className="text-truncate">{n.information}</p>
                          </td>
                          <td>{n.userId}</td>
                          <td>
                            <Button
                              size="sm"
                              variant="light"
                              onClick={() => handleShowUpdate(n)}>
                              UPDATE
                            </Button>
                            <Popconfirm
                              title="Are you sure?"
                              okText="Delete"
                              cancelText="Cancel"
                              onConfirm={() => {
                                handleDelete(n._id);
                              }}>
                              <Button size="sm" variant="danger">
                                DELETE
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
        <Modal
          title="NEW NOTIFICATION"
          centered
          visible={showCreate}
          onOk={handleCreate}
          onCancel={() => setShowCreate(false)}>
          <Form>
            <Form.Group>
              <Form.Label>TITLE</Form.Label>
              <Form.Control
                type="text"
                id="title"
                value={created.title}
                onChange={handleInputCreateChange}
              />
              <Form.Label>INFOMATION</Form.Label>
              <Form.Control
                as="textarea"
                id="information"
                rows={5}
                value={created.information}
                onChange={handleInputCreateChange}
              />
              <Form.Label>TO (SELECT NONE TO NOTI ALL USERS)</Form.Label>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select user"
                defaultValue={[]}
                onChange={(value) => setCreated({ ...created, users: value })}
                onDeselect={(value) =>
                  setCreated({ ...created, users: value })
                }>
                {users.map((u, i) => {
                  return (
                    <Option key={u._id} value={u._id}>
                      {u.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Group>
          </Form>
        </Modal>
        <Modal
          title="UPDATE NOTIFICATION"
          centered
          visible={showUpdate}
          onOk={handleUpdate}
          onCancel={() => setShowUpdate(false)}>
          <Form>
            <Form.Group>
              <Form.Label>NOTIFICATION ID</Form.Label>
              <Form.Control type="text" value={updated._id} disabled />
              <Form.Text className="text-muted">
                Cannot change NOTIFICATION ID
              </Form.Text>
              <Form.Label>TITLE</Form.Label>
              <Form.Control
                type="text"
                id="title"
                value={updated.title}
                onChange={handleInputOnChange}
              />
              <Form.Label>INFOMATION</Form.Label>
              <Form.Control
                as="textarea"
                id="information"
                rows={5}
                value={updated.information}
                onChange={handleInputOnChange}
              />
              <Form.Label>TO (SELECT NONE TO NOTI ALL USERS)</Form.Label>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select user"
                defaultValue={updated.users}
                onChange={handleSelectUser}
                onDeselect={handleDeselectUser}>
                {users.map((u, i) => {
                  return (
                    <Option key={u._id} value={u._id}>
                      {u.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Group>
          </Form>
        </Modal>
      </>
    );
  return <Loading />;
}
