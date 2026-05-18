import { Request, Response } from "express";
import { craeteUserService, deleteUserByIdService, getAllUserService, getUserByIdService, updateUserByIdService } from "../services/userService";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const response = await getAllUserService(req.query);
        return res.status(200).json({ data: response })
    }
    catch (error) {
        return res.status(400).json({ message: 'error while craeting teh user ' })
    }
}

export const createUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    try {
        const response = await craeteUserService(req.body);

        if (response.message == 'This email is already registered') {
            return res.status(404).json({ message: response.message })
        }
        return res.status(201).json({ message: 'User Created successfully ', response })
    } catch (error) {
        return res.status(400).json({ message: 'error while craeting teh user ' })
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Invalid Id ' })
        }
        const data = await getUserByIdService(id);
        res.status(200).json({ messgae: 'user data', user: data });
    } catch (error) {
        return res.status(400).json({ message: 'error while craeting teh user ' })
    }
}

export const deleteUserById = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        if (!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Invalid Id ' })
        }
        await deleteUserByIdService(id);
        res.status(200).json({ message: 'User Deleted Successfully ', status: 'success' })
    } catch (error) {
        return res.status(400).json({ message: 'error while craeting teh user ' })
    }
}



export const updateUSerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Invalid Id ' })
        }
        const data = await updateUserByIdService(id, req.body);
        return res.status(200).json({ message: 'User Updated Successfully ', Product: data, status: 'success' })
    } catch (error) {
        return res.status(400).json({ message: 'error while craeting teh user ' })
    }
}