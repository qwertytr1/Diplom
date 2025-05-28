const HallService = require("../services/hall-service");

class HallController {
  // Получить зал по ID
  static async getHall(req, res) {
    const id = req.params.id;
    try {
      const result = await HallService.getHall(id);
      res.status(result.status).json(result.json);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Создать зал
  static async createHall(req, res) {
    const { name, capacity, floor } = req.body;

    if (!name || typeof capacity !== "number" || typeof floor !== "number") {
      return res.status(400).json({ error: "Invalid or missing fields" });
    }
console.log(req.body)
    try {
      const result = await HallService.createHall({ name, capacity, floor });
      res.status(result.status).json(result.json);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Обновить зал
  static async editHall(req, res) {
    const id = req.params.id;
    const { name, capacity, floor } = req.body;

    try {
      const result = await HallService.editHall(id, { name, capacity, floor });
      res.status(result.status).json(result.json);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Удалить зал
  static async deleteHall(req, res) {
    const id = req.params.id;
    try {
      const result = await HallService.deleteHall(id);
      res.status(result.status).json(result.json);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Получить список всех залов
  static async getAllHalls(req, res) {
    const limit = parseInt(req.query.limit) || 100;
    const offset = parseInt(req.query.offset) || 0;

    try {
      const result = await HallService.getAllHalls(limit, offset);
      res.status(result.status).json(result.json);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = HallController;