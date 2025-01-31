import { IAuthRegister } from "../Auth/auth.interface";
import userModel from "../Auth/auth.model";

const updateUserIntoDb = async (id: string, payload: Partial<IAuthRegister>) => {
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


