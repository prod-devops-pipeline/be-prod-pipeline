import { Request, Response } from "express";
import { loginService } from "../services/authService";
import { comparePassowrd } from "../utils/passwordValidation";
import { IUser } from "../models/User";
import { generateJWTToken } from "../utils/jwt";
const LoginLog = require("../models/LoginLog");

interface AuthRequest extends Request {
    user?: { id: string };
}

export const login = async (req: Request, res: Response) => {
    const credenatial = req.body as { email: string, password: string };
    const user: IUser = await loginService(credenatial.email, credenatial.password);

    if (!user) {
        return res.status(404).json({ message: "User not found." })
    }
    if (user?.password) {
        const password = await comparePassowrd(credenatial.password, user.password);

        if (!password) {
            res.status(404).json({ message: 'Password is Invalid ' })
            return;
        }
    }
    const token = await generateJWTToken(user);
    res.cookie(`${process.env.JWT_TOKEN_NAME}`, token, {
        httpOnly: true,
        secure: false
    });
    const loginLog = await LoginLog.create({
        userId: user._id,
        loginTime: new Date(),
        isActive: true,
    });
    return res.status(200).json({ message: "Login Successfull", data: { user: { email: user.email, name: user.name, role: user.role }, token } })
}

export const logout = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        await LoginLog.findOneAndUpdate(
            { userId, isActive: true },
            {
                logoutTime: new Date(),
                isActive: false,
            },
            { sort: { loginTime: -1 } }
        );
        res.clearCookie(`${process.env.JWT_TOKEN_NAME}`);
        return res.status(200).json({ message: 'Logout successfully !' })
    } catch (error) {
        return res.status(500).json({ message: 'SomeThing went Wrong ' })
    }
}

export const getLoginLogs = async (req: Request, res: Response) => {
    try {
        const logs = await LoginLog.find()
            .populate("userId", "name email")
            .sort({ loginTime: -1 });
        return res.status(200).json({ message: "Fetched the Login deatils ", data: { logs } });
    } catch (error) {
        return res.status(500).json({ message: 'SomeThing went Wrong ' })
    }
}
