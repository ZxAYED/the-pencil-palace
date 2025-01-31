import { z } from "zod";
const phoneRegex = /^(01(3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\d{7})$/;


export const createUserValidation = z.object({
    name: z.string({ message: "Name is required" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    role: z.enum(["admin", "user"], { message: "Role must be either 'admin' or 'user'" }).default('user'),
    status: z.enum(["active", "blocked"], { message: "Status must be 'active' or 'blocked'" }).default('active'),
    address: z.string({ message: "Address is required" }),
    phone: z.string().regex(phoneRegex, {
        message: "Invalid phone number. It must be a valid Bangladeshi number from Airtel, Robi, Banglalink, Teletalk, or Grameenphone.",
    }),
    profileImg: z.string().url({ message: "Profile image must be a valid URL" }),
});
export const updateUserValidation = z.object({
    name: z.string({ message: "Name cannot be empty" }).optional(),
    email: z.string().email({ message: "Invalid email format" }).optional(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }).optional(),
    role: z.enum(["admin", "user"], { message: "Invalid role" }).optional(),
    status: z.enum(["active", "blocked"], { message: "Invalid status" }).optional(),
    address: z.string({ message: "Address cannot be empty" }).optional(),
    phone: z.string().regex(phoneRegex, {
        message: "Invalid phone number. It must be a valid Bangladeshi number from Airtel, Robi, Banglalink, Teletalk, or Grameenphone.",
    }).optional(),
    profileImg: z.string().url({ message: "Profile image must be a valid URL" }).optional(),
});

export const loginUserValidation = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
