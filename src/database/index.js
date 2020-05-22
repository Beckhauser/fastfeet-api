import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Recipient from '../app/models/Recipient';

const models = [Recipient];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
