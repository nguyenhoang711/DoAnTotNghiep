const { SuccessResponse } = require("../core/success.response");
const { BadRequestError } = require("../core/error.response");
const { UserServiceV2 } = require('../services/userV2.service');
class UserControllerV2 {
    handleLogin = async (req, res, next) => {
        new SuccessResponse({
            message: 'login successfully',
            metadata: await UserServiceV2.login(req.body)
        }).send(res);
    }
    handleCreateNewUser = async (req, res) => {
        const data = req.body;
        
        new SuccessResponse({
            message: 'create user successfully',
            metadata: await UserServiceV2.createNewUser(data)
        }).send(res);
    }

    handleGetUserDetailsById = async (req, res) => {
        const { userId } = req.query;
        if (!userId) throw new BadRequestError("UserId not valid!");

        new SuccessResponse({
            message: 'get user details successfully',
            metadata: await UserServiceV2.getDetailUserById(userId)
        }).send(res);
    }

    handleUpdateUserData = async (req, res) => {
        const data = req.body;
        
        const {file} = req;
        if(!data.id) throw new BadRequestError("Missing required paramenters");
        
        new SuccessResponse({
            message: "Update the user success",
            metadata: await UserServiceV2.updateUserData(file, data)
        }).send(res);
    }
}

module.exports = new UserControllerV2()