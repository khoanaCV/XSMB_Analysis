import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


class AuthService {
    async registerUser(req, res, next) {
        const { email, password, username } = req.body;
        try {
            // const salt = await bcrypt.genSalt(10);
            // const hashed = await bcrypt.hash(password, salt);
            // const newUser = new User({ name: username, email, password: hashed });
            // const result = await newUser.save();
            res.json(req.body);
        } catch (error) {
            next(error);
        }
    }

    async loginUser(req, res, next) {
        const { email, password } = req.body;
        try {
            const loginUser = await User.findOne({ email }).exec();

            if (!loginUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            const passwordIsValid = await bcrypt.compare(password, loginUser.password);
            if (!passwordIsValid) {
                return res.status(401).json({ error: 'Password invalid' });
            }

            if (!loginUser.isActive) {
                return res.status(401).json({ error: "User is not active" });
            }

            const jwtSecret = process.env.SECRET_JWT_KEY;
            const token = jwt.sign({
                id: loginUser.id,
                name: loginUser.name,
                email: loginUser.email,
                isActive: loginUser.isActive,
                role: loginUser.role
            }, jwtSecret, {
                algorithm: 'HS256',
                expiresIn: 86400
            });

            res.json({
                id: loginUser.id,
                name: loginUser.name,
                email: loginUser.email,
                role: loginUser.role,
                accessToken: token
            });
        } catch (error) {
            next(error);
        }
    }

    async genAccessToken(user) {
        return jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_JWT_KEY, { expiresIn: '3h' });
    }

    async genRefreshToken(user) {
        return jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '365d' });
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
        res.status(200).json("Logout successful");
    }
}

export default new AuthService();