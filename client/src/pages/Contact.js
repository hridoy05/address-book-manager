import { useEffect, useState } from "react";
import { Form, Input, Row, Col, Button, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-hot-toast";
import AddressUpdateModal from "../modal/AddressUpdateModal";

function Contact() {
  // state
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  //update state
  const [updatingContact, setUpdatingContact] = useState([]);
  const [visible, setVisible] = useState(false);
  //hooks

  const [form] = Form.useForm();
  //search state

  const [searchQueryText, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    getcontacts();
  }, [searchQueryText]);
  const getcontacts = async () => {
    try {
      let url = `http://localhost:8800/contacts`;
      console.log(searchQueryText);
      if (searchQueryText) {
        url = url + `?searchQuery=${searchQueryText}`;
        console.log(url);
      }
      const { data } = await axios.get(url);
      setContacts(data);
    } catch (err) {
      console.log(err);
    }
  };

  //table data
  const columns = [
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "2",
      title: "Mobile_Number",
      dataIndex: "mobile_number",
    },

    {
      key: "3",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                handleEdit(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                handleDelete(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onFinish = async (values) => {
    // console.log("values => ", values);
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8800/contact",
        values
      );
      console.log(data);
      setContacts([data.contact, ...contacts]);
      toast.success("Contact created successfully");
      setLoading(false);
      form.resetFields(["name"]);
      form.resetFields(["mobile_number"]);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8800/contact/${item._id}`
      );
      setContacts(contacts.filter((contact) => contact._id !== data._id));
      toast.success("contact deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("contact delete faild");
    }
  };

  const handleEdit = async (item) => {
    setUpdatingContact(item);
    setVisible(true);
  };

  const handleUpdate = async (values) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8800/contact/${updatingContact._id}`,
        values
      );
      console.log(data);
      const newcontacts = contacts.map((contact) => {
        if (contact._id === data.contact._id) {
          return data.contact;
        }
        return contact;
      });
      setContacts(newcontacts);
      toast.success("contact update successfully");
      setVisible(false);
      setUpdatingContact({});
    } catch (error) {
      console.log(error);
      toast.error("Contact update fail");
    }
  };

  return (
    <Row>
      {/* first column */}
      <Col xs={22} sm={22} lg={6} offset={1}>
        <h1>contacts</h1>
        <p>Add new Address</p>

        <Form onFinish={onFinish} form={form}>
          <Form.Item name="name">
            <Input
              prefix={<EditOutlined className="site-form-item-icon" />}
              placeholder="Give it a name"
            />
          </Form.Item>
          <Form.Item name="mobile_number">
            <Input
              prefix={<EditOutlined className="site-form-item-icon" />}
              placeholder="Give it a Mobile Number"
            />
          </Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Col>
      {/* second column */}
      <Col xs={22} sm={22} lg={14} offset={1}>
        <Input
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            width: "350px",
          }}
          onChange={handleInputChange}
          placeholder="Give it search by a name or mobile number"
        />

        <Table
          columns={columns}
          dataSource={contacts}
          pagination={false}
        ></Table>
      </Col>
      <AddressUpdateModal
        updatingContact={updatingContact}
        handleUpdate={handleUpdate}
        visible={visible}
        setVisible={setVisible}
      />
    </Row>
  );
}

export default Contact;
