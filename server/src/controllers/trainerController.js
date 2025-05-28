const TrainerService = require("../services/trainer-service");

class TrainerController {
  // Получить тренера по ID
  static async getTrainer(req, res) {
    const id = req.params.id;
    try {
      const result = await TrainerService.getTrainer(id);
      res.status(result.status).json(result.json);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Создать тренера
  static async createTrainer(req, res) {
    const { firstName, lastName, specialization, phone, email } = req.body;

    if (!firstName || !lastName || !specialization || !phone || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const result = await TrainerService.createTrainer({ firstName, lastName, specialization, phone, email });
      res.status(result.status).json(result.json);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Обновить тренера
  static async editTrainer(req, res) {
    const id = req.params.id;
    const { firstName, lastName, specialization, phone, email } = req.body;

    try {
      const result = await TrainerService.editTrainer(id, { firstName, lastName, specialization, phone, email });
      res.status(result.status).json(result.json);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Удалить тренера
  static async deleteTrainer(req, res) {
    const id = req.params.id;
    try {
      const result = await TrainerService.deleteTrainer(id);
      res.status(result.status).json(result.json);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Получить список всех тренеров
  static async getAllTrainers(req, res) {
    const limit = parseInt(req.query.limit) || 100;
    const offset = parseInt(req.query.offset) || 0;

    try {
      const result = await TrainerService.getAllTrainers(limit, offset);
      res.status(result.status).json(result.json);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = TrainerController;