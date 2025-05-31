// 📁 services/UserClient.ts
import $api from '../http'; // axios-инстанс, настроенный с baseURL, токеном и т.п.

export default class UserClient {
  // Получить всех пользователей
  static async getAllUsers() {
    return $api.get('/getUsers');
  }

  // Получить одного пользователя по ID
  static async getUser(id: number) {
    return $api.get(`/getUsers/${id}`);
  }

  // Обновить пользователя по ID
  //   static async editUser(id: number, data: { [key: string]: any }) {
  //     return $api.put(`/user/${id}`, data);
  //   }

  // Удалить пользователя по ID
  static async deleteUser(id: number) {
    return $api.delete(`/users/${id}`);
  }
}
