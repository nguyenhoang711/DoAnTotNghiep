import db from "../models/index";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import CommonUtils from '../utils/CommonUtils';
import { uploadImageFromLocal } from "./upload.service";
import { BadRequestError, NotFoundError } from "../core/error.response";
const { Op } = require("sequelize");
require('dotenv').config();
const salt = bcrypt.genSaltSync(10);
const checkUserEmail = async (userEmail) => {
    const user = await db.User.findOne({where: { email: userEmail }});
    return user ? true : false;
}

class UserServiceV2 {
    static async login(data) {
        if(!data.email || !data.password) throw new BadRequestError("Need to fulfill with email and password!");
        const isExist = await checkUserEmail(data.email);
        if(!isExist) throw new NotFoundError("Email chưa được đăng ký")
        const user = await db.User.findOne({
            attributes: ['email', 'roleId', 'password', 'firstName', 'lastName', 'id', 'image'],
            where: { email: data.email, statusId: 'S1' },
            raw: true
        });
        const check = await bcrypt.compareSync(data.password, user.password);
        if(!check) throw new BadRequestError("Wrong password");
        delete user.password;
        const accessToken = CommonUtils.encodeToken(user.id)            
        return {
            accessToken: accessToken,
            user: user
        }
    }
    static async createNewUser(data) {
        if (!data.email || !data.lastName) throw new BadRequestError("Missing required parameters!");
        let hashPassword = bcrypt.hashSync(data.password, salt);

        // const { image_url } = await uploadImageFromLocal({ path: file.path, objectId: data.email, folderName: 'users/' });
        await db.User.create({
            email: data.email,
            password: hashPassword,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            roleId: data.roleId,
            genderId: data.genderId,
            phonenumber: data.phoneNumber,
            // image: image_url,
            dob: data.dob,
            isActiveEmail: 0,
            statusId: 'S1',
            usertoken: '',
        })

        return "OK";
    }

    static async getDetailUserById(userId){
        const user = await db.User.findOne({
            where: {id: userId},
            attributes: {
                exclude: ['password']
            },
            // include: [
            //     { model: db.Allcode, as: 'roleData', attributes: ['value', 'code'] },
            //     { model: db.Allcode, as: 'genderData', attributes: ['value', 'code'] },
            // ],
            raw: true,
            nest: true
        })
        return user;
    }

    static async updateUserData(file, data) {
        let user = await db.User.findOne({
            where: { id: data.id },
            raw: false
        })
        if (!user) throw new NotFoundError("User not found!");
        user.firstName = data.firstName
        user.lastName = data.lastName
        user.address = data.address
        user.phonenumber = data.phoneNumber
        user.roleId = data.roleId
        user.genderId = data.genderId
        // user.dob = data.dob
        if (file) {
            const { image_url } = await uploadImageFromLocal({ path: file.path, objectId: data.email, folderName: 'users/'})
            user.image = image_url
        }
        await user.save();
        return "OK";
    }
}

module.exports = {
    UserServiceV2,
}