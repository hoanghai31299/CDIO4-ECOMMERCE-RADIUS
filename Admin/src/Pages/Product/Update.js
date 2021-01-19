import React, { useEffect, useState } from "react";
import {
  message,
  Input,
  Form,
  Popconfirm,
  Select,
  Image,
  Card,
  InputNumber,
  Button,
} from "antd";
import { useHistory, useParams } from "react-router-dom";
import axios from "../../axios";
function UpdateProduct() {
  const [product, setProduct] = useState({});

  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const history = useHistory();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`/category`)
      .then((res) => {
        if (!res.data.error) setCategories(res.data.category);
        else throw new Error(res.data.message);
      })
      .catch((err) => message.error(err.message));
  }, []);
  useEffect(() => {
    axios
      .get(`/product/${id}`)
      .then((res) => {
        if (!res.data.error) {
          const product = res.data.product;
          form.setFieldsValue({
            _id: product._id,
            name: product.name,
            description: product.description.main,
            size: product.description.size,
            sku: product.description.sku,
            price: product.price,
            categories: product.categories,
          });
          setProduct(res.data.product);
        } else throw new Error(res.data.message);
      })
      .catch((err) => message.error(err.message));
  }, [id, form]);
  const handleUpdate = ({
    categories,
    description,
    sku,
    size,
    name,
    price,
  }) => {
    const descriptions = {
      main: description,
      sku: sku,
      size: size,
    };
    const updateProduct = {
      description: descriptions,
      name,
      price,
      colors: product.colors,
      categories,
    };
    axios
      .put(`/product/${product._id}`, updateProduct)
      .then((res) => {
        if (!res.data.error) {
          setProduct(res.data.product);
          message.success("Saved change");
        } else throw new Error(res.data.message);
      })
      .catch((err) => message.error(err.message));
  };
  const handleDeleteImage = (index, link) => {
    const { colors, _id } = product;
    let newColor = [...colors];
    newColor[index].image_url = newColor[index].image_url.filter(
      (l) => l !== link
    );
    axios
      .put(`/product/update_color/${_id}`, {
        colors: newColor.map((i) => {
          i.color = i.color._id;
          delete i._id;
          return i;
        }),
      })
      .then((res) => {
        if (!res.data.error) message.success("Delete image successful");
        else throw new Error(res.data.message);
        setProduct(res.data.product);
      })
      .catch((err) => message.error(err.message));
  };
  const handleDeleteColor = (index) => {
    const { colors, _id } = product;
    let color = [...colors];
    if (color === 1) return message.error("cannot delete last color");
    color = [...colors.slice(0, index), ...colors.slice(index + 1)];
    axios
      .put(`/product/update_color/${_id}`, {
        colors: color.map((i) => {
          i.color = i.color._id;
          delete i._id;
          return i;
        }),
      })
      .then((res) => {
        if (!res.data.error) message.success("Delete color successful");
        else throw new Error(res.data.message);
        setProduct(res.data.product);
      })
      .catch((err) => message.error(err.message));
  };
  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        onFinish={handleUpdate}>
        <Button
          onClick={() => {
            history.goBack();
          }}>
          Back
        </Button>
        <Form.Item name="_id" label="ID">
          <Input disabled />
        </Form.Item>
        <Form.Item name="categories" label="CATEGORY">
          <Select>
            {categories.map((ctg) => (
              <Select.Option value={ctg._id}>{ctg.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="name" label="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name="description"
          label="DESCRIPTION">
          <Input.TextArea />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name="size" label="SIZE">
          <Input />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name="sku" label="SKU">
          <Input />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name="price" label="PRICE">
          <InputNumber />
        </Form.Item>
        <Form.Item label="COLORS">
          {product.colors &&
            product.colors.map((cl, index) => {
              return (
                <>
                  <Card
                    key={cl._id}
                    hoverable
                    title={cl.color.name.toUpperCase()}
                    extra={
                      <Popconfirm
                        placement="leftBottom"
                        title={"Are you sure to delete this color?"}
                        onConfirm={() => handleDeleteColor(index)}
                        okText="Yes"
                        cancelText="No">
                        <Button danger size="sm">
                          <i className="feather icon-delete" />
                        </Button>
                      </Popconfirm>
                    }>
                    <Form.Item rules={[{ required: true }]} label="Quantity">
                      <InputNumber value={cl.quantity} min={0} />
                    </Form.Item>
                    {cl.image_url.map((link, i) => (
                      <Card
                        className="m-1 d-inline-block custom"
                        key={i}
                        style={{ width: 200, height: "200px !important" }}
                        hoverable
                        cover={<Image width={200} src={link} />}
                        actions={[
                          <Popconfirm
                            key="delete"
                            placement="topRight"
                            title="Are you sure u want to delete this image"
                            onConfirm={() => handleDeleteImage(index, link)}
                            okText="Yes"
                            cancelText="No">
                            <Button danger size="sm">
                              <i className="feather icon-delete" />
                            </Button>
                          </Popconfirm>,
                        ]}></Card>
                    ))}
                  </Card>
                </>
              );
            })}
        </Form.Item>
        <Form.Item label="Save change">
          <Button color="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default UpdateProduct;
