'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
    up: async (queryInterface) => {

        // Getting 'active' status id
        const status_id = await queryInterface.rawSelect('users_statuses', {
            where: {
                name_en: 'active'
            },
        }, ['id']);

        return queryInterface.bulkInsert('users', [
            {
                first_name_en: 'Grigor',
                last_name_en: 'Sargsyan',
                first_name_ru: 'Григорий',
                last_name_ru: 'Саркисян',
                first_name_hy: 'Գրիգոր',
                last_name_hy: 'Սարգսյան',
                birthday: '1986-03-30',
                gender: 'male',
                email: 'sargr1986@gmail.com',
                password: bcrypt.hashSync('jdoe', 10),
                profile_img: '',
                status_id: status_id,
                created_at: new Date()
            },
            {
                first_name_en: 'Anna',
                last_name_en: 'Arutinova',
                first_name_ru: 'Анна',
                last_name_ru: 'Арутинова',
                first_name_hy: 'Աննա',
                last_name_hy: 'Հարությունյան',
                birthday: '1992-07-22',
                gender: 'female',
                email: 'anka_22_07@inbox.ru',
                password: bcrypt.hashSync('jdoe', 10),
                profile_img: '',
                status_id: status_id,
                created_at: new Date()
            }
        ])
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
