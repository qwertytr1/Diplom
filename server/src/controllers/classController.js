const ClassService = require("../services/class-service");

class ClassController {
  static async getClass(req, res) {
    const id = req.params.id;
    const result = await ClassService.getClass(id);
    return res.status(result.status).json(result.json);
  }

  static async getAllClasses(req, res) {
    const limit = parseInt(req.query.limit) || 100;
    const offset = parseInt(req.query.offset) || 0;

    const result = await ClassService.getAllClasses(limit, offset);
    return res.status(result.status).json(result.json);
  }

  static async createClass(req, res) {
    const {
      name,
      trainerName,
      hallName,
      schedule,
      duration,
      maxParticipants
    } = req.body;

    const result = await ClassService.createClass({
      name,
      trainerName,
      hallName,
      schedule,
      duration,
      maxParticipants
    });

    return res.status(result.status).json(result.json);
  }

  static async editClass(req, res) {
    const id = req.params.id;
    const {
      name,
      trainerName,
      hallName,
      schedule,
      duration,
      maxParticipants
    } = req.body;

    const result = await ClassService.editClass(id, {
      name,
      trainerName,
      hallName,
      schedule,
      duration,
      maxParticipants
    });

    return res.status(result.status).json(result.json);
  }

  static async deleteClass(req, res) {
    const id = req.params.id;
    const result = await ClassService.deleteClass(id);
    return res.status(result.status).json(result.json);
  }
}

module.exports = ClassController;