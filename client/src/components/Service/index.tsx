import React, { useEffect, useState } from 'react';
import './services.css';
import { Button, Input, Modal } from 'antd';
import ServicesClient from '../../services/serviceService';

type ServiceType = {
  id: number;
  naming: string;
  overview: string;
  count: number;
};

type ServiceResponse = {
  id_услуги: number;
  название: string;
  описание: string;
  цена: number;
};

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingService, setEditingService] = useState<ServiceType | null>(
    null,
  );
  const [form, setForm] = useState({ naming: '', overview: '', count: 0 });

  const fetchServices = async () => {
    try {
      const response = await ServicesClient.getAllServices();
      const formattedServices = response.data.map((s: ServiceResponse) => ({
        id: s.id_услуги,
        naming: s.название,
        overview: s.описание,
        count: s.цена ?? 0,
      }));
      console.log(response);
      setServices(formattedServices);
    } catch (error) {
      console.error('Ошибка загрузки услуг:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await ServicesClient.deleteService(id);
      fetchServices();
    } catch (error) {
      console.error('Ошибка при удалении услуги:', error);
    }
  };

  const handleEdit = (service: ServiceType) => {
    setEditingService(service);
    setForm({
      naming: service.naming,
      overview: service.overview,
      count: service.count,
    });
    setModalVisible(true);
  };

  const handleCreate = () => {
    setEditingService(null);
    setForm({ naming: '', overview: '', count: 0 });
    setModalVisible(true);
  };

  const handleCreateService = async () => {
    try {
      await ServicesClient.createService(
        form.naming,
        form.overview,
        form.count,
      );
      setModalVisible(false);
      fetchServices();
    } catch (error) {
      console.error('Ошибка при создании услуги:', error);
    }
  };

  const handleEditService = async () => {
    if (!editingService) return;
    try {
      await ServicesClient.editService(
        editingService.id,
        form.naming,
        form.overview,
        form.count,
      );
      setModalVisible(false);
      fetchServices();
    } catch (error) {
      console.error('Ошибка при редактировании услуги:', error);
    }
  };

  return (
    <div className="services-page">
      <h1 className="services-title">Наши услуги</h1>
      <Button
        type="primary"
        onClick={handleCreate}
        style={{ marginBottom: 16 }}
      >
        Добавить услугу
      </Button>

      <div className="service-cards">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <h2>{service.naming}</h2>
            <p>{service.overview}</p>
            <p>Цена: {service.count}</p>
            <Button onClick={() => handleEdit(service)} type="link">
              Редактировать
            </Button>
            <Button onClick={() => handleDelete(service.id)} type="link" danger>
              Удалить
            </Button>
          </div>
        ))}
      </div>

      <Modal
        title={editingService ? 'Редактировать услугу' : 'Добавить услугу'}
        visible={isModalVisible}
        onOk={editingService ? handleEditService : handleCreateService}
        onCancel={() => setModalVisible(false)}
      >
        <Input
          placeholder="Название"
          value={form.naming}
          onChange={(e) => setForm({ ...form, naming: e.target.value })}
          style={{ marginBottom: 8 }}
        />
        <Input.TextArea
          placeholder="Описание"
          value={form.overview}
          onChange={(e) => setForm({ ...form, overview: e.target.value })}
          style={{ marginBottom: 8 }}
        />
        <Input
          type="number"
          placeholder="Количество"
          value={form.count}
          onChange={(e) => setForm({ ...form, count: Number(e.target.value) })}
        />
      </Modal>
    </div>
  );
};

export default ServiceList;
