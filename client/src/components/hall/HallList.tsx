import React, { useEffect, useState } from 'react';
import './style.css';
import { Input, InputNumber, Button, Modal, message } from 'antd';
import HallCard from './HallCard';
import HallService from '../../services/hallService';

type HallType = {
  id: number;
  name: string;
  capacity: number;
  floor: number;
};

type HallResponse = {
  id_зала: number;
  название: string;
  вместимость: number;
  этаж: number;
};

const HallList: React.FC = () => {
  const [halls, setHalls] = useState<HallType[]>([]);
  const [newHall, setNewHall] = useState({ name: '', capacity: 0, floor: 1 });
  const [editingHall, setEditingHall] = useState<HallType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchHalls = async () => {
    try {
      const response = await HallService.getAllHalls();
      const formatted = response.data.map((hall: HallResponse) => ({
        id: hall.id_зала,
        name: hall.название,
        capacity: hall.вместимость,
        floor: hall.этаж,
      }));
      console.log(formatted);
      setHalls(formatted);
    } catch (err) {
      message.error('Ошибка загрузки залов');
    }
  };

  useEffect(() => {
    fetchHalls();
  }, []);

  const handleCreate = async () => {
    try {
      await HallService.createHall(
        newHall.name,
        newHall.capacity,
        newHall.floor,
      );
      await fetchHalls();
      setNewHall({ name: '', capacity: 0, floor: 1 });
    } catch (err) {
      message.error('Ошибка создания зала');
    }
  };

  const handleDelete = async (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    Modal.confirm({
      title: 'Удалить зал?',
      content: 'Вы уверены, что хотите удалить этот зал?',
      okText: 'Да',
      cancelText: 'Отмена',
      okType: 'danger',
      async onOk() {
        try {
          await HallService.deleteHall(id);
          await fetchHalls();
        } catch {
          message.error('Ошибка удаления зала');
        }
      },
    });
  };

  const openEditModal = (hall: HallType, event: React.MouseEvent) => {
    event.stopPropagation();
    setEditingHall(hall);
    setIsModalVisible(true);
  };

  const handleEditSubmit = async () => {
    if (editingHall) {
      try {
        await HallService.editHall(
          editingHall.id,
          editingHall.name,
          editingHall.capacity,
          editingHall.floor,
        );
        await fetchHalls();
        setIsModalVisible(false);
        setEditingHall(null);
      } catch {
        message.error('Ошибка обновления зала');
      }
    }
  };

  return (
    <div className="halls-page">
      <h1 className="page-title">Наши залы</h1>

      <div className="create-form">
        <Input
          placeholder="Название"
          value={newHall.name}
          onChange={(e) => setNewHall({ ...newHall, name: e.target.value })}
        />
        <InputNumber
          placeholder="Вместимость"
          value={newHall.capacity}
          onChange={(value) => setNewHall({ ...newHall, capacity: value ?? 0 })}
        />
        <InputNumber
          placeholder="Этаж"
          value={newHall.floor}
          onChange={(value) => setNewHall({ ...newHall, floor: value ?? 1 })}
        />
        <Button type="primary" onClick={handleCreate}>
          Добавить зал
        </Button>
      </div>

      <div className="hall-list">
        {halls.map((hall) => (
          <HallCard
            key={hall.id}
            hall={hall}
            onDelete={(event) => handleDelete(hall.id, event)}
            onEdit={(event) => openEditModal(hall, event)}
          />
        ))}
      </div>

      <Modal
        title="Редактировать зал"
        open={isModalVisible}
        onOk={handleEditSubmit}
        onCancel={() => setIsModalVisible(false)}
        okText="Сохранить"
        cancelText="Отмена"
      >
        {editingHall && (
          <>
            <Input
              value={editingHall.name}
              onChange={(e) =>
                setEditingHall({ ...editingHall, name: e.target.value })
              }
              placeholder="Название"
            />
            <InputNumber
              value={editingHall.capacity}
              onChange={(value) =>
                setEditingHall({ ...editingHall, capacity: value ?? 0 })
              }
              placeholder="Вместимость"
              style={{ width: '100%', marginTop: 10 }}
            />
            <InputNumber
              value={editingHall.floor}
              onChange={(value) =>
                setEditingHall({ ...editingHall, floor: value ?? 1 })
              }
              placeholder="Этаж"
              style={{ width: '100%', marginTop: 10 }}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default HallList;
