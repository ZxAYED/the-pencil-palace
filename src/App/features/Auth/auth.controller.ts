/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import CatchAsync from "../../utils/CatchAsync";
import { AuthService } from "./auth.service";

const register = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await AuthService.register(req.file,req.body);
    res.status(200).json({
        success: true,
        message: 'User created successfully',
        data: result
    });
});
const getAllUsers = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.getAllUsersFromDB();
    res.status(200).json({
        success: true,
        message: 'Users fetched successfully',
        data: result
    });
})
const login = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.login(req.body);
    console.log(result)
    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data: result
    });
});
const updateUser = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.updateUserIntoDb(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: result
    });
})

export const AuthController = {
    register,
    login, getAllUsers, updateUser
}

