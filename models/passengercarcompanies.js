'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class passengerCarCompanies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.vehicle, {foreignKey: "passengerCarCompanies_id"});
      this.belongsTo(models.users, {foreignKey: "users_id"});
    }
  }
  passengerCarCompanies.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    users_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'passengerCarCompanies',
  });
  return passengerCarCompanies;
};