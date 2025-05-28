import React from 'react';
import './contacts.css';

const ContactsPage: React.FC = () => {
  return (
    <section className="contacts">
      <h2>Свяжитесь с нами</h2>
      <p>
        Мы всегда рады помочь вам! Заполните форму или используйте контактные
        данные ниже.
      </p>

      <div className="contacts-container">
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ваше имя"
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Электронная почта"
            required
          />
          <textarea
            id="message"
            name="message"
            placeholder="Сообщение"
            rows={5}
            required
          />

          <button type="submit">Отправить</button>
        </form>

        <div className="contact-info">
          <h3>Контактная информация</h3>
          <p>
            <strong>Адрес:</strong> г. Минск, ул. Примерная, 12
          </p>
          <p>
            <strong>Телефон:</strong> +375 29 123-45-67
          </p>
          <p>
            <strong>Email:</strong> info@flexgym.by
          </p>
          <p>
            <strong>Время работы:</strong> Пн–Вс, 8:00–22:00
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactsPage;
