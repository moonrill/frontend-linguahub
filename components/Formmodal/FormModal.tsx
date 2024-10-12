import React from 'react';
import { Modal, Form, Input, Row, Col, Select, DatePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';

interface FormModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
}

const FormModal: React.FC<FormModalProps> = ({ visible, onCancel, onOk }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Form Values:', values);
        onOk(); 
        form.resetFields(); 
      })
      .catch((info) => {
        console.log('Validation Failed:', info);
      });
  };

  return (
    <Modal
      title="Create Service R equest"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Submit"
      cancelText="Cancel"
      centered
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        name="serviceRequestForm"
        style={{ padding: '20px' }}
      >
        <Form.Item
          name="service"
          label="Service"
          rules={[{ required: true, message: 'Please select a service type!' }]}
        >
          <Select placeholder="Select a service type">
            <Select.Option value="service1">Service 1</Select.Option>
            <Select.Option value="service2">Service 2</Select.Option>
            <Select.Option value="service3">Service 3</Select.Option>
          </Select>
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="date"
              label="Tanggal"
              rules={[{ required: true, message: 'Silakan pilih tanggal!' }]}
            >
              <DatePicker format="DD-MM-YYYY" placeholder="Pilih Tanggal" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="startDate"
              label="Mulai"
              rules={[{ required: true, message: 'Silakan pilih tanggal mulai!' }]}
            >
              <DatePicker format="DD-MM-YYYY HH:mm" showTime placeholder="Pilih Tanggal Mulai" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="endDate"
              label="Akhir"
              rules={[{ required: true, message: 'Silakan pilih tanggal akhir!' }]}
            >
              <DatePicker format="DD-MM-YYYY HH:mm" showTime placeholder="Pilih Tanggal Akhir" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="location"
          label="Location"
          rules={[
            { required: true, message: 'Please input your location!' },
            { max: 100, message: 'Location cannot exceed 100 characters.' },
          ]}
        >
          <TextArea placeholder="Enter location" maxLength={100} />
        </Form.Item>

        <Form.Item
          name="notes"
          label="Notes"
          rules={[
            { required: true, message: 'Please input your notes!' },
            { max: 100, message: 'Notes cannot exceed 100 characters.' },
          ]}
        >
          <TextArea placeholder="Notes for translator" maxLength={100} />
        </Form.Item>

        <Form.Item
          name="coupon"
          label="Select Coupon"
          rules={[{ required: true, message: 'Please select a coupon!' }]}
        >
          <Select placeholder="Select a coupon">
            <Select.Option value="coupon1">Coupon 1</Select.Option>
            <Select.Option value="coupon2">Coupon 2</Select.Option>
            <Select.Option value="coupon3">Coupon 3</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormModal;
