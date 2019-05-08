'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const user_id = await queryInterface.rawSelect('users', {
            where: {
                first_name_en: 'John',
                last_name_en: 'Doe'
            },
        }, ['id']);

        const role_id = await queryInterface.rawSelect('roles', {
            where: {
                name_en:'Admin'
            },
        }, ['id']);

        if (user_id) {
            return queryInterface.bulkInsert('users_roles', [{
                user_id:user_id,
                role_id:role_id
            }], {});
        }
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users_roles', null, {});
    }
};
