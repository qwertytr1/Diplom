import { type AxiosResponse } from 'axios';
import $api from '../http/index';
import { type AuthResponse } from '../models/response/authResponce';

export default class AuthService {
  static async login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', { email, password });
  }

  static async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    gender: 'М' | 'Ж',
    birthDate: string,
    phone: string,
    address?: string, // <- добавляем
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/register', {
      firstName,
      lastName,
      email,
      password,
      gender,
      birthDate,
      phone,
      address, // <- отправляем на сервер
    });
  }

  static async logout(): Promise<void> {
    return $api.post('/logout');
  }

  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get<AuthResponse>('/refresh');
  }
}
