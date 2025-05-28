import $api from '../http';

export default class HallService {
  // Получить все залы
  static async getAllHalls() {
    return $api.get('/halls');
  }

  // Получить зал по ID
  static async getHall(id: number) {
    return $api.get(`/hall/${id}`);
  }

  // Создать новый зал
  static async createHall(name: string, capacity: number, floor: number) {
    return $api.post('/hall', { name, capacity, floor });
  }

  // Обновить зал по ID
  static async editHall(
    id: number,
    name: string,
    capacity: number,
    floor: number,
  ) {
    console.log(id);
    return $api.put(`/hall/${id}`, {
      name,
      capacity,
      floor,
    });
  }

  // Удалить зал по ID
  static async deleteHall(id: number) {
    return $api.delete(`/hall/${id}`);
  }
}
