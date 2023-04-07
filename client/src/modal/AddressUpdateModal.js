import { EditOutlined } from "@ant-design/icons";
import { Modal, Form, Input, Button } from "antd";

const AddressUpdateModal = ({
  visible,
  setVisible,
  handleUpdate,
  updatingContact,
}) => {
  return (
    <Modal
      title="Update Contact"
      open={visible}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <Form
        onFinish={handleUpdate}
        fields={[
          { name: ["name"], value: updatingContact.name },
          { name: ["mobile_number"], value: updatingContact.mobile_number },
        ]}
      >
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
};

export default AddressUpdateModal;
