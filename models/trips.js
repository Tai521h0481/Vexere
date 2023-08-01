'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trips extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.stations, {foreignKey: "fromStation"});
      this.belongsTo(models.stations, {foreignKey: "toStation"});
      this.hasMany(models.tickets, {foreignKey: "trip_id"});
    }
  }
  trips.init({
    fromStation: DataTypes.INTEGER,
    toStation: DataTypes.INTEGER,
    startTime: DataTypes.DATE,
    price: DataTypes.FLOAT,
    passengerCarCompanies_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'trips',
  });
  return trips;
};