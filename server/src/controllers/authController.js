const authService = require("../services/auth-service");
const { validationResult } = require('express-validator');
const ApiError = require("../exceptions/api-error");

class AuthController {
  static async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }

      const {
        firstName,
        lastName,
        gender,
        birthDate,
        phone,
        password, // <--- добавлено!
        email,
        address
      } = req.body;

      const visitorData = await authService.register({
        firstName,
        lastName,
        gender,
        birthDate,
        phone,
        password, // <--- добавлено!
        email,
        address
      });

      return res.status(201).json(visitorData);
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await authService.login(email, password);
      return res.status(201).json(userData);
    } catch (error) {
      next(error);
    }
  }

  // static async logout(req, res, next) {
  //   try {
  //     const accessToken = req.headers['authorization']?.split(' ')[1];
  //     return res.json({ message: 'Logout successful' });
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  // static async refresh(req, res, next) {
  //   try {
  //     const accessToken = req.headers['authorization']?.split(' ')[1];
  //     if (!accessToken) {
  //       throw ApiError.UnauthorizedError();
  //     }
  //     const userData = await authService.refreshAccessToken(accessToken);
  //     return res.json(userData);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}

module.exports = AuthController;
