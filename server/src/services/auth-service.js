const VisitorDto = require('../dtos/user-dto.js');
const  {User}  = require('../models/index.js');
const UsersModel = require('../models/users');
const bcrypt = require('bcryptjs');
const ApiError = require('../exceptions/api-error.js');
const validator = require('validator');
const sequelize = require('../config/database');
const UserDto = require('../dtos/user-dto.js');
class AuthService {

        async register({
          firstName,
          lastName,
          gender,
          birthDate,
            phone,
            password,
          email,
          address
        }) {
            const hashedPassword = await bcrypt.hash(password, 10);
          const existingVisitor = await User.findOne({ where: { email } });
          if (existingVisitor) {
            throw ApiError.BadRequest('Email is already in use.');
          }

            const newVisitor = await User.create({
            имя: firstName,
            фамилия: lastName,
            пол: gender,
            дата_рождения: birthDate,
            телефон: phone,
            email: email,
            адрес: address,
            дата_регистрации: new Date()
          });
          const Users = await UsersModel.create({
            email: email,
            phone: phone,
              password: hashedPassword,
              role: 'user',
          });
          const visitorDto = new VisitorDto(newVisitor);
          const userDto = new UserDto(Users);
          return { user: visitorDto, users:userDto };
        }

        async login(email, password) {

          const user = await UsersModel.findOne({ where: { email } });
          const fulluser = await User.findOne({ where: { email } });
          if (!user) {
              throw ApiError.BadRequest('User not found');
          }
          const isPassEquals = await bcrypt.compare(password, user.password);
          if (!isPassEquals) {
              throw ApiError.BadRequest('Invalid password');
          }

          const visitorDto = new VisitorDto(fulluser);
          const userDto = new UserDto(user);
          return { users: user, user: fulluser };
      }
//     async logout(refreshToken) {
//         const token = await TokenService.removeToken(refreshToken);
//         return token;
//      }
//     async refreshAccessToken(accessToken) {
//         if (!accessToken) {
//             throw ApiError.UnauthorizedError();
//         }
//         const userData = tokenService.validateAccessToken(accessToken);
//         if (!userData) {
//             throw ApiError.UnauthorizedError();
//         }
//         const user = await User.findOne({ where: { id: userData.id } });
//         const userDto = new UserDto(user);
//         const tokens = tokenService.generateAccessToken({...userDto});
//         return {...tokens, user: userDto}
//     }
}


module.exports = new AuthService();
