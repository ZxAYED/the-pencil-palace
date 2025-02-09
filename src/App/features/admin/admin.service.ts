import AppError from "../../Error/AppError";
import { IAuthRegister } from "../Auth/auth.interface";
import userModel from "../Auth/auth.model";

const updateUserIntoDb = async (id: string, payload: Partial<IAuthRegister>) => {
    const isUserExits = await userModel.findOne({ email: payload.email });
    console.log(id, payload)
    if (!isUserExits) {
        throw new AppError(404, 'User not found');
    }
    if (isUserExits.isDeleted) {
        throw new AppError(403, 'This user is already deleted !');
    }
    if (isUserExits.status === 'blocked') {
        throw new AppError(403, 'This user is already blocked !');
    }
    if (payload.role || payload.isDeleted && isUserExits.role === 'user') {
        throw new AppError(403, 'You are not authorized to update this user !');

    }

    const user = await userModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return user;
}


const getAllUsersFromDb = async () => {
    const users = await userModel.find();
    return users;
}
export const AdminService = {
    updateUserIntoDb, getAllUsersFromDb
}


