import React, { useState } from 'react';
import './style.css';
import RegisterModal from '../register'; // импортируем регистрацию

const MainSection: React.FC = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openRegister = () => {
    setIsRegisterOpen(true);
  };

  const closeRegister = () => setIsRegisterOpen(false);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="overlay" />
        <div className="hero-content">
          <h1>
            ПРЕВРАТИ СВОЮ <br /> МЕЧТУ В <br /> РЕАЛЬНОСТЬ
          </h1>
          <p className="subtitle">
            Современный фитнес-клуб с индивидуальным подходом к каждому
          </p>
          <div className="hero-buttons">
            <button
              className="primary-btn"
              type="button"
              onClick={openRegister}
            >
              НАЧАТЬ СЕЙЧАС
            </button>
            <RegisterModal open={isRegisterOpen} onClose={closeRegister} />
            <button className="secondary-btn" type="button">
              УЗНАТЬ БОЛЬШЕ
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-content">
          <h2>FLEX GYM — больше, чем просто тренажерный зал</h2>
          <div className="line" />
          <p>
            FLEX GYM — это современный фитнес-клуб, созданный для тех, кто ценит
            качество, комфорт и результат. Мы предлагаем не просто место для
            тренировок, а целую экосистему для поддержания здорового образа
            жизни.
          </p>
          <p>
            Наш клуб оборудован новейшими тренажерами, просторными залами для
            групповых занятий и комфортными зонами отдыха. Мы гордимся нашей
            командой профессиональных тренеров, которые помогут вам достичь
            ваших целей.
          </p>
          <p>
            FLEX GYM работает 24/7, чтобы вы могли заниматься в удобное для вас
            время. Присоединяйтесь к нашему сообществу и станьте лучшей версией
            себя!
          </p>
          <div className="stats">
            <div>
              <strong>7</strong>
              <span>Лет опыта</span>
            </div>
            <div>
              <strong>1500+</strong>
              <span>Довольных клиентов</span>
            </div>
            <div>
              <strong>12</strong>
              <span>Профессиональных тренеров</span>
            </div>
            <div>
              <strong>50+</strong>
              <span>Видов тренировок</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="overlay" />
        <div className="testimonial-content">
          <p>
            FLEX GYM изменил мое отношение к тренировкам. Профессиональные
            тренеры помогли мне достичь результатов, о которых я даже не мечтал.
            Теперь я рекомендую этот клуб всем своим друзьям!
          </p>
          <div className="author">
            <strong>Александр Ковалев</strong>
            <br />
            Клиент уже 2 года
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="cta-final">
        <h2>Готовы начать свой путь к лучшей версии себя?</h2>
        <button className="cta-btn" type="button" onClick={openRegister}>
          НАЧАТЬ ТРЕНИРОВКИ
        </button>
      </section>
      <section className="memberships">
        <h2>Тарифы FLEX GYM</h2>
        <div className="membership-cards">
          {[
            {
              title: 'Разовый визит',
              price: '15 BYN',
              desc: 'Одно посещение клуба без ограничений по зонам.',
            },
            {
              title: 'Базовый',
              price: '75 BYN / мес',
              desc: 'Доступ с 8:00 до 22:00, по будням.',
            },
            {
              title: 'Студенческий',
              price: '55 BYN / мес',
              desc: 'Для студентов – выгодный тариф в дневные часы.',
            },
            {
              title: 'Премиум',
              price: '130 BYN / мес',
              desc: 'Доступ 24/7, групповые тренировки, сауна и бассейн.',
            },
            {
              title: 'Персональный',
              price: '200 BYN / мес',
              desc: 'Индивидуальные тренировки, план питания, консультации.',
            },
            {
              title: 'Годовой',
              price: '850 BYN / год',
              desc: 'Экономия 25%, гостевые визиты включены.',
            },
          ].map((plan) => (
            <div className="membership-card" key={plan.title}>
              <h3 className="title">{plan.title}</h3>
              <p className="price">{plan.price}</p>
              <div className="plan-desc">
                {plan.desc.split(',').map((line) => {
                  const trimmedLine = line.trim();
                  return (
                    <React.Fragment key={trimmedLine}>
                      <p>{trimmedLine}</p>
                      <div className="separator" />
                    </React.Fragment>
                  );
                })}
              </div>
              <button type="button" onClick={openRegister}>
                Выбрать
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default MainSection;
