import React from 'react';
import { Modal, Form, Input, Button, Select, DatePicker } from 'antd';
import './register.css';

const { Option } = Select;

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

const Register: React.FC<RegisterModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const handleFinish = () => {
    console.log('Registration data:');
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Регистрация"
      open={open}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        name="registerForm"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Имя"
          name="firstName"
          rules={[{ required: true, message: 'Введите имя' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Фамилия"
          name="lastName"
          rules={[{ required: true, message: 'Введите фамилию' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пол"
          name="gender"
          rules={[{ required: true, message: 'Выберите пол' }]}
        >
          <Select placeholder="Выберите пол">
            <Option value="Мужской">Мужской</Option>
            <Option value="Женский">Женский</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Дата рождения"
          name="birthDate"
          rules={[{ required: true, message: 'Укажите дату рождения' }]}
        >
          <DatePicker format="DD.MM.YYYY" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Телефон"
          name="phone"
          rules={[{ required: true, message: 'Введите номер телефона' }]}
        >
          <Input placeholder="+375..." />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Введите email' },
            { type: 'email', message: 'Некорректный email' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Register;
