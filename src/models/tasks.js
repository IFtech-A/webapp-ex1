'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tasks.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    taskName: {
      type: DataTypes.STRING,
      allowNull: false,
      allowEmpty: false,
    },
    finished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    server: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    duration: {
      type: DataTypes.NUMBER,
      defaultValue: 0
    },
    createdAt: DataTypes.DATE,
    startedAt: DataTypes.DATE,
    finishedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'tasks',
    timestamps: false,
  }); 
  return tasks;
};