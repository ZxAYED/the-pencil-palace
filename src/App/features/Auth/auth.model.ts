import { model, Schema } from "mongoose";

import { IAuthRegister } from "./auth.interface";

const userSchema = new Schema<IAuthRegister>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], required: true },
    status: { type: String, enum: ['active', 'inactive'], required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    profileImage: { type: String, required: true },
})
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
})
const userModel = model<IAuthRegister>('User', userSchema);

export default userModel;
