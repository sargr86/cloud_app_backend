require('../constants/sequelize');


module.exports = (fNameCol,lNameCol)=>{
    return [sequelize.fn('concat', sequelize.col(fNameCol), ' ', sequelize.col(lNameCol)), 'full_name']
};