module.exports = class VisitorDto {
    id_посетителя;
    email;
    имя;
    фамилия;
    пол;
    дата_рождения;
    телефон;
    адрес;
    дата_регистрации;

    constructor(model) {
      this.id_посетителя = model.id_посетителя;
      this.email = model.email;
      this.имя = model.имя;
      this.фамилия = model.фамилия;
      this.пол = model.пол;
      this.дата_рождения = model.дата_рождения;
      this.телефон = model.телефон;
      this.адрес = model.адрес;
      this.дата_регистрации = model.дата_регистрации;
    }
}
module.exports = class UserDto {
    id;
    email;
    phone;
    role;
    constructor(model) {
      this.id = model.id;
      this.email = model.email;
        this.phone = model.phone;
        this.role = model.role;
    }
  }

