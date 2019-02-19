'use strict';

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('users_statuses', [
            {
                'name_en': 'active',
                'name_ru': 'активный',
                'name_hy': 'ակտիվ'
            },
            {
                'name_en': 'inactive',
                'name_ru': 'неактивный',
                'name_hy': 'ոչ ակտիվ'
            }
        ])
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('users_statuses', null, {});
    }
};
