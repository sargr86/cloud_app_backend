'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_roles = sequelize.define('users_roles', {
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {});
  users_roles.associate = function(models) {
    // associations can be defined here
  };
  return users_roles;
};