'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users_statuses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name_en: {
                type: Sequelize.STRING
            },
            name_ru: {
                type: Sequelize.STRING
            },
            name_hy: {
                type: Sequelize.STRING
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users_statuses');
    }
};