import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import LoginModal from '../login';
import RegisterModal from '../register'; // импортируем регистрацию

const Header: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const closeLogin = () => setIsLoginOpen(false);
  const closeRegister = () => setIsRegisterOpen(false);

  return (
    <header className="flex-header">
      <div className="flex-logo">
        FLEX <span className="orange">GYM</span>
      </div>

      <nav className="flex-nav">
        <Link to="/">Главная</Link>
        <Link to="/halls">Залы</Link>
        <Link to="/about">О нас</Link>
        <Link to="/services">Услуги</Link>
        <Link to="/trainers">Тренеры</Link>
        <Link to="/contacts">Контакты</Link>
      </nav>

      <div className="flex-right">
        <button type="button" className="login-btn" onClick={openLogin}>
          Войти
        </button>
      </div>

      <LoginModal
        open={isLoginOpen}
        onClose={closeLogin}
        onRegisterClick={openRegister}
      />

      <RegisterModal open={isRegisterOpen} onClose={closeRegister} />
    </header>
  );
};

export default Header;
