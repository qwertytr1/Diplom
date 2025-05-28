import React, { useState } from 'react';
import { Modal, Form, Input, Button, Typography } from 'antd';
import './login.css';

const { Title } = Typography;

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onRegisterClick: () => void; // добавим хэндлер на регистрацию
}

const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onClose,
  onRegisterClick,
}) => {
  const [authMethod, setAuthMethod] = useState<'email' | 'phone' | null>(null);
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    onClose();
    setAuthMethod(null);
  };

  const handleFinish = () => {
    console.log('Login data:');
    form.resetFields();
    onClose();
    setAuthMethod(null);
  };

  return (
    <Modal
      title="Вход"
      open={open}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
    >
      {!authMethod && (
        <div className="choose-method">
          <Title level={4} style={{ textAlign: 'center' }}>
            Как вы хотите войти?
          </Title>
          <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
            <Button
              type="primary"
              block
              size="large"
              onClick={() => setAuthMethod('email')}
            >
              По Email
            </Button>
            <Button
              type="primary"
              block
              size="large"
              onClick={() => setAuthMethod('phone')}
            >
              По телефону
            </Button>
          </div>
        </div>
      )}

      {authMethod && (
        <Form
          form={form}
          layout="vertical"
          name="loginForm"
          onFinish={handleFinish}
          style={{ marginTop: 20 }}
        >
          {authMethod === 'email' && (
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Введите email' },
                { type: 'email', message: 'Некорректный email' },
              ]}
            >
              <Input placeholder="Введите ваш email" />
            </Form.Item>
          )}

          {authMethod === 'phone' && (
            <Form.Item
              label="Телефон"
              name="phone"
              rules={[{ required: true, message: 'Введите номер телефона' }]}
            >
              <Input placeholder="+375..." />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Войти
            </Button>
          </Form.Item>

          <Button type="link" onClick={() => setAuthMethod(null)} block>
            Назад
          </Button>

          <Button
            type="link"
            onClick={onRegisterClick}
            block
            className="register-btn"
          >
            Нет аккаунта? Зарегистрироваться
          </Button>
        </Form>
      )}
    </Modal>
  );
};

export default LoginModal;
