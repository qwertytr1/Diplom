import $api from '../http'; // Предполагается, что axios или другой клиент настроен здесь

const TrainerService = {
  // Получить список тренеров с пагинацией
  getAllTrainers(limit: number = 100, offset: number = 0) {
    return $api.get(`/trainers?limit=${limit}&offset=${offset}`);
  },

  // Получить одного тренера по ID
  getTrainer(id: number) {
    return $api.get(`/trainer/${id}`);
  },

  // Создать нового тренера
  createTrainer(
    firstName: string,
    lastName: string,
    specialization: string,
    phone: string,
    email: string,
  ) {
    return $api.post('/trainer', {
      firstName,
      lastName,
      specialization,
      phone,
      email,
    });
  },

  // Обновить тренера по ID
  editTrainer(
    id: number,
    firstName: string,
    lastName: string,
    specialization: string,
    phone: string,
    email: string,
  ) {
    return $api.put(`/trainer/${id}`, {
      firstName,
      lastName,
      specialization,
      phone,
      email,
    });
  },

  // Удалить тренера
  deleteTrainer(id: number) {
    return $api.delete(`/trainer/${id}`);
  },
};

export default TrainerService;
