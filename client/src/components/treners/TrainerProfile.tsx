import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TrainerService from '../../services/trainerService';
import './style.css';

type TrainerType = {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  email: string;
  phone: string;
};

const TrainerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [trainer, setTrainer] = useState<TrainerType | null>(null);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const response = await TrainerService.getTrainer(Number(id));
        setTrainer(response.data.trainer);
      } catch (error) {
        console.error('Ошибка при получении тренера:', error);
      }
    };

    fetchTrainer();
  }, [id]);

  if (!trainer) {
    return <div className="trainer-profile">Загрузка...</div>;
  }

  const fullName = `${trainer.firstName} ${trainer.lastName}`;

  return (
    <div className="trainer-profile">
      <img
        src={`https://randomuser.me/api/portraits/${trainer.id % 2 === 0 ? 'women' : 'men'}/${30 + trainer.id}.jpg`}
        alt={fullName}
        className="trainer-photo"
      />
      <h2 className="trainer-name">{fullName}</h2>
      <p className="trainer-specialty">{trainer.specialization}</p>
      <p className="trainer-description">
        Опытный тренер, сертифицированный специалист. Email: {trainer.email},
        Телефон: {trainer.phone}
      </p>
    </div>
  );
};

export default TrainerProfile;
