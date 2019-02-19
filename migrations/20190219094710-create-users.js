'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            status_id: {
                type: Sequelize.INTEGER
            },
            first_name_en: {
                type: Sequelize.STRING
            },
            last_name_en: {
                type: Sequelize.STRING
            },
            first_name_ru: {
                type: Sequelize.STRING
            },
            last_name_ru: {
                type: Sequelize.STRING
            },
            first_name_hy: {
                type: Sequelize.STRING
            },
            last_name_hy: {
                type: Sequelize.STRING
            },
            birthday: {
                type: Sequelize.DATEONLY
            },
            gender: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            profile_img: {
                type: Sequelize.STRING
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};
