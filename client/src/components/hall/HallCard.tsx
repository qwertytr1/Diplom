import React from 'react';
import './style.css';
import { Button } from 'antd';

type Hall = {
  id: number;
  name: string;
  capacity: number;
  floor: number;
};

type HallProps = {
  hall: Hall;
  onEdit: (event: React.MouseEvent) => void;
  onDelete: (event: React.MouseEvent) => void;
};

const HallCard: React.FC<HallProps> = ({ hall, onEdit, onDelete }) => {
  return (
    <div className="hall-card">
      <h2>{hall.name}</h2>
      <p>Вместимость: {hall.capacity} чел.</p>
      <p>Этаж: {hall.floor}</p>
      <div className="hall-actions">
        <Button onClick={onEdit} type="default">
          Редактировать
        </Button>
        <Button onClick={onDelete} danger type="primary">
          Удалить
        </Button>
      </div>
    </div>
  );
};

export default HallCard;
