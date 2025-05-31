// import { makeAutoObservable } from 'mobx';
// import { message } from 'antd';
// import AuthService from '../services/authService';
// import $api from '../http';
// import { IUser } from '../models/iUser';

export default class AuthStore {
  // user: IUser | null = null;
  // // isAuth = false;
  // // isLoading = false;
  // constructor() {
  //   makeAutoObservable(this);
  // }
  // setAuth(isAuth: boolean) {
  //   this.isAuth = isAuth;
  // }
  // setUser(user: IUser | null) {
  //   this.user = user;
  // }
  // setLoading(isLoading: boolean) {
  //   this.isLoading = isLoading;
  // }
  // async login(email: string, password: string) {
  //   try {
  //     this.setLoading(true);
  //     const response = await AuthService.login(email, password);
  //     if (response.data.user.isBlocked) {
  //       message.error('Ваш аккаунт заблокирован');
  //       return;
  //     }
  //     localStorage.setItem('token', response.data.accessToken);
  //     this.setAuth(true);
  //     this.setUser(response.data.user);
  //     message.success('Вход выполнен успешно');
  //   } catch (error) {
  //     console.error('Ошибка входа:', error);
  //     message.error('Неверный email или пароль');
  //   } finally {
  //     this.setLoading(false);
  //   }
  // }
  // async register(
  //   firstName: string,
  //   lastName: string,
  //   email: string,
  //   password: string,
  //   gender: string,
  //   birthDate: string,
  //   phone: string,
  // ) {
  //   try {
  //     this.setLoading(true);
  //     const response = await AuthService.register(
  //       firstName,
  //       lastName,
  //       email,
  //       password,
  //       gender,
  //       birthDate,
  //       phone,
  //     );
  //     localStorage.setItem('token', response.data.accessToken);
  //     this.setAuth(true);
  //     this.setUser(response.data.user);
  //     message.success('Регистрация прошла успешно!');
  //   } catch (error) {
  //     console.error('Ошибка регистрации:', error);
  //     message.error('Ошибка при регистрации');
  //   } finally {
  //     this.setLoading(false);
  //   }
  // }
  // async logout() {
  //   try {
  //     await $api.post('/logout');
  //     localStorage.removeItem('token');
  //     this.setAuth(false);
  //     this.setUser(null);
  //   } catch (error) {
  //     console.error('Ошибка выхода:', error);
  //   }
  // }
  // async checkAuth() {
  //   this.setLoading(true);
  //   try {
  //     const response = await $api.get('/refresh');
  //     localStorage.setItem('token', response.data.accessToken);
  //     this.setAuth(true);
  //     this.setUser(response.data.user);
  //   } catch (error) {
  //     console.error('Ошибка проверки авторизации:', error);
  //   } finally {
  //     this.setLoading(false);
  //   }
  // }
}
