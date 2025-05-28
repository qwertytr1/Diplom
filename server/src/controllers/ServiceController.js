const ServiceService = require("../services/service-service.js");

class ServiceController {
  // Получить услугу по ID
  static async getService(req, res, next) {
    const id = req.params.id;
    try {
      const result = await ServiceService.getService(id);
      res.status(result.status).json(result.json);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Создать новую услугу
  static async createService(req, res, next) {
    const { naming, overview, count } = req.body;

    if (!naming || !overview || typeof count !== "number") {
      return res.status(400).json({ error: "Invalid input data" });
    }

    try {
      const result = await ServiceService.createService(naming, overview, count);
      res.status(result.status).json(result.json);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Обновить услугу
  static async editService(req, res, next) {
    const id = req.params.id;
    const { naming, overview, count } = req.body;

    try {
      const result = await ServiceService.editService(id, naming, overview, count);
      res.status(result.status).json(result.json);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Удалить услугу
  static async deleteService(req, res, next) {
    const id = req.params.id;
    try {
      const result = await ServiceService.deleteService(id);
      res.status(result.status).json(result.json);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Получить все услуги (с optional пагинацией)
  static async getAllServices(req, res, next) {
    const limit = parseInt(req.query.limit) || 100;
    const offset = parseInt(req.query.offset) || 0;

    try {
      const result = await ServiceService.getAllServices(limit, offset);
      res.status(result.status).json(result.json);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = ServiceController;