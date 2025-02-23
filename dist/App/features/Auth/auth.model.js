"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], required: true },
    status: { type: String, enum: ['active', 'inactive'], required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    profileImage: { type: String, required: true },
    passwordChangedAt: { type: Date, default: Date.now() },
    passwordResetExpires: { type: String },
    passwordResetToken: { type: String },
}, { timestamps: true });
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});
// userSchema.pre('find', function (next) {
//     this.find({ isDeleted: false });
//     this.find({ status: 'active' });
//     next();
// })
const userModel = (0, mongoose_1.model)('User', userSchema);
exports.default = userModel;
