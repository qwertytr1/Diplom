import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  trainer: {
    id: number;
    name: string;
    // lastName: string;
    specialty: string;
    photo: string;
  };
};

const TrainerCard: React.FC<Props> = ({ trainer }) => {
  return (
    <Link to={`/trainers/${trainer.id}`} className="trainer-card">
      <img src={trainer.photo} alt={trainer.name} className="trainer-photo" />
      <div className="trainer-info">
        <h2>{trainer.name}</h2>
        <p>{trainer.specialty}</p>
      </div>
    </Link>
  );
};

export default TrainerCard;
