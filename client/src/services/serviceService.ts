import $api from '../http';

export default class ServicesClient {
  // Получить одну услугу по ID
  static async getService(id: number) {
    return $api.get(`/services/${id}`);
  }

  // Получить все услуги с необязательной пагинацией
  static async getAllServices(limit = 100, offset = 0) {
    return $api.get(`/services`, {
      params: { limit, offset },
    });
  }

  // Создать новую услугу
  static async createService(naming: string, overview: string, count: number) {
    return $api.post(`/services`, {
      naming,
      overview,
      count,
    });
  }

  // Обновить услугу по ID
  static async editService(
    id: number,
    naming: string,
    overview: string,
    count: number,
  ) {
    return $api.put(`/services/${id}`, {
      naming,
      overview,
      count,
    });
  }

  // Удалить услугу по ID
  static async deleteService(id: number) {
    return $api.delete(`/services/${id}`);
  }
}
