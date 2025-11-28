const bcrypt = require('bcrypt');
const UserModel = require('../models/user-model.js');
const uuid= require('uuid');
const mailService = require('./mail-service.js');
const tokenService = require('./token-service.js');
const UserDto = require('../dtos/user-dto.js');
const ApiError = require('../exceptions/api-error.js')


class UserServiсe{

    async registration(email, name, password){
        const candidat =  await UserModel.findOne({email})

        if(candidat){
            throw ApiError.BadRequest(`Користувач із таким email ${email} вже існує`)
        }
        const hashPssword =await bcrypt.hash(password, 3);
        const activationLink = uuid.v4()

        const user = await UserModel.create({email, name, password: hashPssword, activationLink})
        await mailService.sendActivationMail(email,`${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user)//email, id, isActivated
        const tokens =tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return{...tokens, user:userDto }

    }

    async activate(activationLink){
            const user = await UserModel.findOne({activationLink})

            if(!user){
                throw ApiError.BadRequest('Неправельна силка підтвердження')
            }
            user.isActivated = true;
            await user.save();
    }

    async login(email , password){
        const user = await UserModel.findOne({email})
        if(!user){
            throw ApiError.BadRequest('Користувач із таким email ненайдений')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){
            throw ApiError.BadRequest('Неправильний пароль')
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return{...tokens, user: userDto }
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token 
    }


    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthorizedError
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb){
            throw ApiError.UnauthorizedError()
        }

        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return{...tokens, user: userDto }
    }

    async getAllUsers(){
        const users = await UserModel.find()
        return users;
    }


}


module.exports = new UserServiсe();

