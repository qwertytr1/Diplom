import React, { useEffect, useState } from 'react';
import './style.css';
import TrainerCard from './TrainerCard';
import TrainerService from '../../services/trainerService'; // Импорт реального сервиса

type TrainerType = {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  email: string;
  phone: string;
};

const TrainerList: React.FC = () => {
  const [trainers, setTrainers] = useState<TrainerType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await TrainerService.getAllTrainers();
        console.log('TrainerService response:', response);
        setTrainers(response.data); // <- возможно здесь ошибка
      } catch (error) {
        console.error('Ошибка при получении тренеров:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  if (loading) {
    return <div className="trainers-page">Загрузка...</div>;
  }

  return (
    <div className="trainers-page">
      <h1 className="page-title">Наши тренеры</h1>
      <div className="trainer-list">
        {trainers.map((trainer) => (
          <TrainerCard
            key={trainer.id}
            trainer={{
              id: trainer.id,
              name: `${trainer.firstName} ${trainer.lastName}`,
              specialty: trainer.specialization,
              photo: `https://randomuser.me/api/portraits/${trainer.id % 2 === 0 ? 'women' : 'men'}/${30 + trainer.id}.jpg`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TrainerList;
