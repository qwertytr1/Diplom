const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// === MODELS ===


const User = sequelize.define('Посетители', {
  id_посетителя: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  имя: { type: DataTypes.STRING(50), allowNull: false },
  фамилия: { type: DataTypes.STRING(50), allowNull: false },
  пол: { type: DataTypes.CHAR(1), allowNull: false },
  дата_рождения: { type: DataTypes.DATE, allowNull: false },
  телефон: { type: DataTypes.STRING(20), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  адрес: { type: DataTypes.STRING(255), allowNull: true },
  дата_регистрации: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: false, tableName: 'Посетители' });

const Service = sequelize.define('Услуги', {
  id_услуги: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  название: { type: DataTypes.STRING(100), allowNull: false },
  описание: { type: DataTypes.TEXT, allowNull: true },
  цена: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, { timestamps: false, tableName: 'Услуги' });

const Visit = sequelize.define('Посещения', {
  id_посещения: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  id_посетителя: { type: DataTypes.INTEGER, allowNull: false },
  дата_посещения: { type: DataTypes.DATE, allowNull: false },
  время_входа: { type: DataTypes.TIME, allowNull: false },
  время_выхода: { type: DataTypes.TIME, allowNull: true },
  id_зала: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: false, tableName: 'Посещения' });

const Payment = sequelize.define('Платежи', {
  id_платежа: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  id_посетителя: { type: DataTypes.INTEGER, allowNull: false },
  сумма: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  дата_платежа: { type: DataTypes.DATE, allowNull: false },
  способ_оплаты: { type: DataTypes.STRING(50), allowNull: false }
}, { timestamps: false, tableName: 'Платежи' });

const Review = sequelize.define('Отзывы', {
  id_отзыва: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  id_посетителя: { type: DataTypes.INTEGER, allowNull: false },
  id_тренера: { type: DataTypes.INTEGER, allowNull: false },
  рейтинг: { type: DataTypes.INTEGER, allowNull: false },
  комментарий: { type: DataTypes.TEXT, allowNull: true },
  дата_отзыва: { type: DataTypes.DATE, allowNull: false }
}, { timestamps: false, tableName: 'Отзывы' });

const Trainer = sequelize.define('Тренеры', {
  id_тренера: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  имя: { type: DataTypes.STRING(50), allowNull: false },
  фамилия: { type: DataTypes.STRING(50), allowNull: false },
  специализация: { type: DataTypes.STRING(100), allowNull: false },
  телефон: { type: DataTypes.STRING(20), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false }
}, { timestamps: false, tableName: 'Тренеры' });

const ServiceOrder = sequelize.define('Заказы_услуг', {
  id_заказа: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  id_посетителя: { type: DataTypes.INTEGER, allowNull: false },
  id_услуги: { type: DataTypes.INTEGER, allowNull: false },
  дата_заказа: { type: DataTypes.DATE, allowNull: false }
}, { timestamps: false, tableName: 'Заказы_услуг' });

const Subscription = sequelize.define('Абонементы', {
  id_абонемента: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  id_посетителя: { type: DataTypes.INTEGER, allowNull: false },
  дата_начала: { type: DataTypes.DATE, allowNull: false },
  дата_окончания: { type: DataTypes.DATE, allowNull: false },
  тип_абонемента: { type: DataTypes.STRING(50), allowNull: false },
  цена: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, { timestamps: false, tableName: 'Абонементы' });

const ClassRegistration = sequelize.define('Регистрация_на_занятия', {
  id_регистрации: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  id_посетителя: { type: DataTypes.INTEGER, allowNull: false },
  id_занятия: { type: DataTypes.INTEGER, allowNull: false },
  дата_регистрации: { type: DataTypes.DATE, allowNull: false }
}, { timestamps: false, tableName: 'Регистрация_на_занятия' });

const Hall = sequelize.define('Залы', {
  id_зала: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  название: { type: DataTypes.STRING(100), allowNull: false },
  вместимость: { type: DataTypes.INTEGER, allowNull: false },
  этаж: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: false, tableName: 'Залы' });

const Class = sequelize.define('Занятия', {
  id_занятия: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  название: { type: DataTypes.STRING(100), allowNull: false },
  расписание: { type: DataTypes.STRING(255), allowNull: false },
  длительность: { type: DataTypes.INTEGER, allowNull: false },
  макс_участников: { type: DataTypes.INTEGER, allowNull: false },
  id_тренера: { type: DataTypes.INTEGER, allowNull: false },
  id_зала: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: false, tableName: 'Занятия' });

// === RELATIONS ===

// Посетитель
User.hasMany(Visit, { foreignKey: 'id_посетителя' });
User.hasMany(Payment, { foreignKey: 'id_посетителя' });
User.hasMany(Review, { foreignKey: 'id_посетителя' });
User.hasMany(ServiceOrder, { foreignKey: 'id_посетителя' });
User.hasMany(Subscription, { foreignKey: 'id_посетителя' });
User.hasMany(ClassRegistration, { foreignKey: 'id_посетителя' });

// Связи обратные
Visit.belongsTo(User, { foreignKey: 'id_посетителя' });
Payment.belongsTo(User, { foreignKey: 'id_посетителя' });
Review.belongsTo(User, { foreignKey: 'id_посетителя' });
ServiceOrder.belongsTo(User, { foreignKey: 'id_посетителя' });
Subscription.belongsTo(User, { foreignKey: 'id_посетителя' });
ClassRegistration.belongsTo(User, { foreignKey: 'id_посетителя' });

// Тренер
Trainer.hasMany(Review, { foreignKey: 'id_тренера' });
Trainer.hasMany(Class, { foreignKey: 'id_тренера' });

// Услуга
Service.hasMany(ServiceOrder, { foreignKey: 'id_услуги' });
ServiceOrder.belongsTo(Service, { foreignKey: 'id_услуги' });

// Зал
Hall.hasMany(Visit, { foreignKey: 'id_зала' });
Visit.belongsTo(Hall, { foreignKey: 'id_зала' });

Hall.hasMany(Class, { foreignKey: 'id_зала' });
Class.belongsTo(Hall, { foreignKey: 'id_зала' });

// Занятие
Class.hasMany(ClassRegistration, { foreignKey: 'id_занятия' });
ClassRegistration.belongsTo(Class, { foreignKey: 'id_занятия' });

Class.belongsTo(Trainer, { foreignKey: 'id_тренера' });

// === EXPORT ===
module.exports = {
  sequelize,

  User,
  Service,
  Visit,
  Payment,
  Review,
  Trainer,
  ServiceOrder,
  Subscription,
  ClassRegistration,
  Hall,
  Class
};
