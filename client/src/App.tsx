import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import TrainerList from './components/treners';
import TrainerProfile from './components/treners/TrainerProfile';
import HallList from './components/hall/HallList';
import ServiceList from './components/Service';
import ReviewList from './components/review';
import MainSection from './components/main';
import ContactsPage from './components/contacts';

function AppWrapper() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/trainers" element={<TrainerList />} />
        <Route path="/trainers/:id" element={<TrainerProfile />} />
        <Route path="/halls" element={<HallList />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/reviews" element={<ReviewList />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
