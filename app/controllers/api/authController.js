const User = require('../../models/users');
const bcryptJs = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
class authController {
    register = async (req, res, next) => {
        try {
            let request = req.body;
            let hashPassword = await bcryptJs.hash(request.password, 8);
            let data = {
                name: request.name,
                email: request.email,
                password: hashPassword,
            }
            let createdUser = (await User.create(data)).get();
            delete createdUser.password;
            return res.status(200).json({ status: true, message: "User registered successfully", data: createdUser });
        } catch (error) {
            next(error.message);
        }
    }
    login = async (req, res, next) => {
        try {
            let request = req.body;
            let findUser = await User.findOne({ where: { email: request.email } });
            let validLogin = await bcryptJs.compare(request.password, findUser.password);
            if (!validLogin) {
                return res.status(401).json({ status: false, "message": "User Credential does not match" });
            }
            findUser = findUser.get();
            delete findUser.password;
            var token = jsonWebToken.sign({ clientId: findUser.id }, process.env.JWT_SECRETE, { expiresIn: "1d" });
            return res.status(200).json({ status: true, 'message': "User Login successfully", token: token, "data": findUser });
        } catch (error) {
            next(error.message);
        }

    }
}

const objAuthController = new authController();
module.exports = objAuthController;