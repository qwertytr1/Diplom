const { Service } = require('../models/index.js');

class ServiceService {
    // Получить услугу по ID
    async getService(id) {
        const service = await Service.findByPk(id);
        if (!service) {
            return { status: 404, json: { error: 'Service not found' } };
        }
        return { status: 200, json: service };
    }

    // Создать новую услугу
    async createService(naming,overview,count) {
        try {
			const newService = await Service.create(
				{
					Название: naming,
					Описание: overview,
					Цена: count,
				}
			);
            return { status: 201, json: newService };
        } catch (error) {
            return { status: 400, json: { error: error.message } };
        }
    }

    // Обновить услугу
    async editService(id, naming,overview,count) {
        const service = await Service.findByPk(id);
        if (!service) {
            return { status: 404, json: { error: 'Service not found' } };
        }

        try {
            await service.update({naming,overview,count});
            return {
                status: 200,
                json: {
                    message: 'Service updated successfully',
                    service
                }
            };
        } catch (error) {
            return { status: 400, json: { error: error.message } };
        }
    }

    // Удалить услугу
    async deleteService(id) {
        const service = await Service.findByPk(id);
        if (!service) {
            return { status: 404, json: { error: 'Service not found' } };
        }

        await service.destroy();
        return {
            status: 200,
            json: { message: 'Service deleted successfully' }
        };
    }

    // Получить все услуги (опционально: с пагинацией)
    async getAllServices(limit = 100, offset = 0) {
        const services = await Service.findAll({ limit, offset });
        return {
            status: 200,
            json: services
        };
    }
}

module.exports = new ServiceService();