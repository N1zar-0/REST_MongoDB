import {Response, Request} from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/User";


export const login = async (req: Request, res: Response) => {
    const {login, pass} = req.body;

    try {
        const user = await UserModel.findOne({login});
        if (!user) {
            res.status(400).json({error: "Invalid credentials"});
            return;
        }

        const isMatch = await bcrypt.compare(pass, user.pass);
        if (!isMatch) {
            res.status(400).json({error: "Invalid credentials"});
            return;
        }

        req.session.userId = user._id as string;
        res.status(200).json({ok: true});
    } catch (error) {
        res.status(500).json({error: "Login failed"});
    }
}


export const logout = async (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({error: "Logout failed"});
            return;
        }

        res.clearCookie("connect.sid");
        res.status(200).json({ok: true});
    });
}


export const register = async (req: Request, res: Response) => {
    const {login, pass} = req.body;

    try {
        const user = await UserModel.findOne({login});
        if (user) {
            res.status(400).json({error: "User already exists"});
            return;
        }

        const hashedPassword = await bcrypt.hash(pass, 10);

        const newUser = new UserModel({login, pass: hashedPassword});
        await newUser.save();

        res.status(201).json({ok: true});
    } catch (e) {
        res.status(500).json({error: "Registration failed"});
    }
}