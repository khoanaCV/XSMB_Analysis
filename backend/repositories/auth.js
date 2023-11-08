import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


class AuthService {
    registerUser = async ({
        name,
        email,
        password,
    }) => {
        const userExisting = await User.findOne({ email }).exec()
        if (userExisting != null) {
            throw new Error("User existing.")
        }

        // Mã hóa mật khẩu
        const hashPassword = await bcrypt.hash(password, parseInt(process.env.SECRET_KEY))

        const newUser = await User.create({
            isActive: true,
            name,
            email,
            password: hashPassword,
        })

        // Clone a new user
        return {
            ...newUser._doc,
            password: 'Not show'
        }
    }

    loginUser = async ({ email, password }) => {
        try {
            const userExisting = await User.findOne({ email }).exec();
            if (!userExisting) {
                throw new Error('User not exist.');
            }

            const isMatch = await bcrypt.compare(password, userExisting.password);
            if (!isMatch) {
                throw new Error("Wrong email and password");
            }

            if (!userExisting.isActive) {
                throw new Error("User is not active");
            }

            const accessToken = jwt.sign(
                {
                    name: userExisting.name,
                    email: userExisting.email
                },
                process.env.SECRET_JWT_KEY,
                {
                    expiresIn: "1h"
                }
            );

            return {
                ...userExisting.toObject(),
                password: undefined,
                token: accessToken
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }


    async genAccessToken(user) {
        return jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_JWT_KEY, { expiresIn: '3h' });
    }

    async genRefreshToken(user) {
        return jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '365d' });
    }

    async refreshAccessToken(req, res) {
        const { id } = req.body;
        const findUser = await User.findById(id);
        if (!findUser) {
            return res.status(404).json("Not found User");
        }
        const getRefreshTokenInDB = findUser.refreshToken;

        try {
            jwt.verify(getRefreshTokenInDB, process.env.SECRET_KEY);
            const newAccessToken = await this.genAccessToken(findUser);
            const newRefreshToken = await this.genRefreshToken(findUser);

            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });

            await User.findByIdAndUpdate({ _id: findUser.id }, { refreshToken: newRefreshToken });

            res.status(200).json({ accessToken: newAccessToken });
        } catch (error) {
            res.status(403).json("Invalid refreshToken");
        }
    }

    async logoutUser(req, res) {
        res.clearCookie("accessToken");
    }
}

export default new AuthService();