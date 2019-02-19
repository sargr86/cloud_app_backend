'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    status_id: DataTypes.INTEGER,
    first_name_en: DataTypes.STRING,
    last_name_en: DataTypes.STRING,
    first_name_ru: DataTypes.STRING,
    last_name_ru: DataTypes.STRING,
    first_name_hy: DataTypes.STRING,
    last_name_hy: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_img: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};