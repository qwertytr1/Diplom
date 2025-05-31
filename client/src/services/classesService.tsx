import $api from '../http';

class ClassService {
  // Получить список занятий с лимитом и оффсетом
  static async getAllClasses(limit = 100, offset = 0) {
    return $api.get(`/classes`, {
      params: { limit, offset },
    });
  }

  // Получить одно занятие по ID
  static async getClass(id: number) {
    return $api.get(`/class/${id}`);
  }

  // Создать новое занятие
  static async createClass(data: {
    name: string;
    trainerName: string;
    hallName: string;
    schedule: string;
    duration: number;
    maxParticipants: number;
  }) {
    return $api.post(`/classes`, data);
  }

  // Отредактировать занятие по ID
  static async editClass(
    id: number,
    name?: string,
    trainerName?: string,
    hallName?: string,
    schedule?: string,
    duration?: number,
    maxParticipants?: number,
  ) {
    return $api.put(`/classes/${id}`, {
      name,
      trainerName,
      hallName,
      schedule,
      duration,
      maxParticipants,
    });
  }

  // Удалить занятие по ID
  static async deleteClass(id: number) {
    return $api.delete(`/classes/${id}`);
  }
}

export default ClassService;
