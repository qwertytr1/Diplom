export interface VisitorDto {
  имя: string;
  фамилия: string;
  пол: string;
  дата_рождения: string;
  телефон: string;
  email: string;
  адрес?: string;
  дата_регистрации: string;
}

export interface UserDto {
  email: string;
  phone: string;
  role: string;
  // не возвращаем пароль, он не нужен в ответе
}

export interface AuthResponse {
  user: VisitorDto;
  users: UserDto;
}
