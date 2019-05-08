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
                first_name_en: 'John',
                last_name_en: 'Doe',
                birthday: '1986-03-30',
                gender: 'male',
                email: 'johndoe@gmail.com',
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
