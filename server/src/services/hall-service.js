const  {Hall}  = require('../models/index.js');

class HallService {
  // Получить зал по ID
  async getHall(id) {
    const hall = await Hall.findByPk(id);
    if (!hall) {
      return { status: 404, json: { error: "Hall not found" } };
    }
    return { status: 200, json: hall };
  }

  // Создать новый зал
  async createHall({ name, capacity, floor }) {
    try {
		const newHall = await Hall.create({
			название: name,       // здесь маппинг с name -> название
			вместимость: capacity, // capacity -> вместимость
			этаж: floor,          // floor -> этаж
		  });
      return { status: 201, json: newHall };
    } catch (error) {
      return { status: 400, json: { error: error.message } };
    }
  }

  // Обновить данные зала
  async editHall(id, { name, capacity, floor }) {
    const hall = await Hall.findByPk(id);
    if (!hall) {
      return { status: 404, json: { error: "Hall not found" } };
    }

    try {
      await hall.update({
        название: name,
        вместимость: capacity,
        этаж: floor
      });
      return {
        status: 200,
        json: { message: "Hall updated successfully", hall }
      };
    } catch (error) {
      return { status: 400, json: { error: error.message } };
    }
  }

  // Удалить зал
  async deleteHall(id) {
    const hall = await Hall.findByPk(id);
    if (!hall) {
      return { status: 404, json: { error: "Hall not found" } };
    }

    await hall.destroy();
    return { status: 200, json: { message: "Hall deleted successfully" } };
  }

  // Получить все залы
  async getAllHalls(limit = 100, offset = 0) {
	  const halls = await Hall.findAll({ limit, offset });
	  console.log(halls)
    return { status: 200, json: halls };
  }
}

module.exports = new HallService();