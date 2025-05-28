const { Class,  Trainer,  Hall } = require("../models");

class ClassService {
	async getClass(id) {
	  const found = await Class.findByPk(id, {
		include: [
		  { model: Trainer, attributes: ['имя', 'фамилия'] },
		  { model: Hall, attributes: ['название'] }
		]
	  });

	  if (!found) {
		return { status: 404, json: { error: "Class not found" } };
	  }

	  return {
		status: 200,
		json: {
		  id: found.id_занятия,
		  name: found.название,
		  schedule: found.расписание,
		  duration: found.длительность,
		  maxParticipants: found.макс_участников,
		  trainer: `${found.Тренеры?.имя ?? "?"} ${found.Тренеры?.фамилия ?? ""}`,
		  hall: found.Залы?.название ?? "?"
		}
	  };
	}

	async getAllClasses(limit = 100, offset = 0) {
	  const classes = await Class.findAll({
		limit,
		offset,
		include: [
		  { model: Trainer, attributes: ['имя', 'фамилия'] },
		  { model: Hall, attributes: ['название'] }
		]
	  });

	  const json = classes.map(cls => ({
		id: cls.id_занятия,
		name: cls.название,
		schedule: cls.расписание,
		duration: cls.длительность,
		maxParticipants: cls.макс_участников,
		trainer: `${cls.Тренеры?.имя ?? "?"} ${cls.Тренеры?.фамилия ?? ""}`,
		hall: cls.Залы?.название ?? "?"
	  }));

	  return { status: 200, json };
	}

	async createClass({ name, trainerName, hallName, schedule, duration, maxParticipants }) {
	  try {
		const [firstName, lastName] = trainerName.trim().split(" ");

		const trainer = await Trainer.findOne({
		  where: { имя: firstName, фамилия: lastName }
		});

		if (!trainer) {
		  return { status: 404, json: { error: "Trainer not found" } };
		}

		const hall = await Hall.findOne({ where: { название: hallName } });

		if (!hall) {
		  return { status: 404, json: { error: "Hall not found" } };
		}

		const created = await Class.create({
		  название: name,
		  id_тренера: trainer.id_тренера,
		  id_зала: hall.id_зала,
		  расписание: schedule,
		  длительность: duration,
		  макс_участников: maxParticipants
		});

		return { status: 201, json: created };
	  } catch (error) {
		return { status: 400, json: { error: error.message } };
	  }
	}

	async editClass(id, { name, trainerName, hallName, schedule, duration, maxParticipants }) {
	  const cls = await Class.findByPk(id);
	  if (!cls) {
		return { status: 404, json: { error: "Class not found" } };
	  }

	  try {
		const [firstName, lastName] = trainerName.trim().split(" ");

		const trainer = await Trainer.findOne({
		  where: { имя: firstName, фамилия: lastName }
		});

		if (!trainer) {
		  return { status: 404, json: { error: "Trainer not found" } };
		}

		const hall = await Hall.findOne({ where: { название: hallName } });

		if (!hall) {
		  return { status: 404, json: { error: "Hall not found" } };
		}

		await cls.update({
		  название: name,
		  id_тренера: trainer.id_тренера,
		  id_зала: hall.id_зала,
		  расписание: schedule,
		  длительность: duration,
		  макс_участников: maxParticipants
		});

		return { status: 200, json: { message: "Class updated", cls } };
	  } catch (error) {
		return { status: 400, json: { error: error.message } };
	  }
	}

	async deleteClass(id) {
	  const cls = await Class.findByPk(id);
	  if (!cls) {
		return { status: 404, json: { error: "Class not found" } };
	  }

	  await cls.destroy();
	  return { status: 200, json: { message: "Class deleted successfully" } };
	}
  }
module.exports = new ClassService();