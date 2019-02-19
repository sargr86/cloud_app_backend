'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_statuses = sequelize.define('users_statuses', {
    name_en: DataTypes.STRING,
    name_ru: DataTypes.STRING,
    name_hy: DataTypes.STRING
  }, {timestamps:false});
  users_statuses.associate = function(models) {
    // associations can be defined here
  };
  return users_statuses;
};