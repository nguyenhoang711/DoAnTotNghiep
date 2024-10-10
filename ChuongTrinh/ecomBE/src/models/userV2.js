'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserV2 extends Model {
    };
    UserV2.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        roleId: DataTypes.STRING,
        statusId: DataTypes.STRING,
        genderId: DataTypes.STRING,
        isActiveEmail: DataTypes.BOOLEAN,
        dob: DataTypes.STRING,
        phonenumber: DataTypes.STRING,
        address: DataTypes.STRING,
        image: DataTypes.STRING,
        usertoken: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'UserV2',
    });
    return UserV2;
};