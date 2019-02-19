'use strict';
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    name_en: DataTypes.STRING,
    name_ru: DataTypes.STRING,
    name_hy: DataTypes.STRING
  }, {timestamps:false,underscored:true});
  roles.associate = function(models) {
    // associations can be defined here
  };
  return roles;
};