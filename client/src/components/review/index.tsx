// src/components/reviews/ReviewList.tsx
import React, { useEffect, useState } from 'react';
import './review.css';

type ReviewType = {
  id: number;
  trainerName: string;
  userName: string;
  comment: string;
  rating: number; // от 1 до 5
  date: string; // ISO string или любая строка даты
};

const mockReviews: ReviewType[] = [
  {
    id: 1,
    trainerName: 'Иван Иванов',
    userName: 'Алексей Петров',
    comment:
      'Очень понравились тренировки! Индивидуальный подход и поддержка на каждом шагу.',
    rating: 5,
    date: '2025-05-10',
  },
  {
    id: 2,
    trainerName: 'Анна Смирнова',
    userName: 'Мария Ковалева',
    comment: 'Хороший тренер, но было слишком много человек на занятии.',
    rating: 3,
    date: '2025-04-22',
  },
  {
    id: 3,
    trainerName: 'Дмитрий Козлов',
    userName: 'Игорь Зайцев',
    comment: 'Помог прокачать спину и правильно работать с весами. Рекомендую!',
    rating: 4,
    date: '2025-03-15',
  },
];

const ReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  useEffect(() => {
    // Заменить на fetch из API
    setTimeout(() => {
      setReviews(mockReviews);
    }, 500);
  }, []);

  const renderStars = (rating: number) =>
    '★'.repeat(rating) + '☆'.repeat(5 - rating);

  return (
    <div className="reviews-page">
      <h1 className="reviews-title">Отзывы наших клиентов</h1>
      <div className="review-cards">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-rating">{renderStars(review.rating)}</div>
            <div className="review-meta">
              <strong>{review.userName}</strong> о тренере{' '}
              <strong>{review.trainerName}</strong>
            </div>
            <p className="review-comment">“{review.comment}”</p>
            <div className="review-date">
              {new Date(review.date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
