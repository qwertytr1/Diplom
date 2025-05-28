const { Trainer } = require("../models");

class TrainerService {
  // Получить тренера по ID
  async getTrainer(id) {
    const trainer = await Trainer.findByPk(id);
    if (!trainer) {
      return { status: 404, json: { error: "Trainer not found" } };
    }
    return { status: 200, json: trainer };
  }

  // Создать нового тренера
  async createTrainer({ firstName, lastName, specialization, phone, email }) {
    try {
      const newTrainer = await Trainer.create({
        имя: firstName,
        фамилия: lastName,
        специализация: specialization,
        телефон: phone,
        email: email
      });
      return { status: 201, json: newTrainer };
    } catch (error) {
      return { status: 400, json: { error: error.message } };
    }
  }

  // Обновить данные тренера
  async editTrainer(id, { firstName, lastName, specialization, phone, email }) {
    const trainer = await Trainer.findByPk(id);
    if (!trainer) {
      return { status: 404, json: { error: "Trainer not found" } };
    }

    try {
      await trainer.update({
        имя: firstName,
        фамилия: lastName,
        специализация: specialization,
        телефон: phone,
        email: email
      });
      return {
        status: 200,
        json: { message: "Trainer updated successfully", trainer }
      };
    } catch (error) {
      return { status: 400, json: { error: error.message } };
    }
  }

  // Удалить тренера
  async deleteTrainer(id) {
    const trainer = await Trainer.findByPk(id);
    if (!trainer) {
      return { status: 404, json: { error: "Trainer not found" } };
    }

    await trainer.destroy();
    return { status: 200, json: { message: "Trainer deleted successfully" } };
  }

  // Получить всех тренеров
  async getAllTrainers(limit = 100, offset = 0) {
    const trainers = await Trainer.findAll({ limit, offset });
    return { status: 200, json: trainers };
  }
}

module.exports = new TrainerService();
