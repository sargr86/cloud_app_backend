'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('roles', [
            {
                name_en: "Admin",
                name_ru:"Администратор",
                name_hy:"Ադմինիստրատոր"
            },
            {
                name_en: "User",
                name_ru:"Пользователь",
                name_hy:"Օգտագործող"

            }
        ])

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('roles', null, {});
    }
};
