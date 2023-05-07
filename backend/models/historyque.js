'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class historyque extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      historyque.belongsTo(
          models.User,{
            foreignKey: 'userId',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
      )
    }
  }
  historyque.init({
    numberOne: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numberTwo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'User',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    sum: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'historyque',
  });
  return historyque;
};