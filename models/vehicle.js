'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.passengerCarCompanies, {foreignKey: "passengerCarCompanies_id"});
      this.hasMany(models.seats, {foreignKey: "vehicle_id"});
    }
  }
  vehicle.init({
    name: DataTypes.STRING,
    passengerCarCompanies_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'vehicle',
  });
  return vehicle;
};