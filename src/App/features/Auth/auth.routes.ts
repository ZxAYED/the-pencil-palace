import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "./auth.controller";
import { createUserValidation, loginUserValidation } from "./auth.validation";
import validateRequest from "../../utils/ValidateRequest";
import auth from "../../middleware/auth";
import upload from "../../utils/multer.config";

const authRouter = Router();

authRouter.post('/register', validateRequest(createUserValidation), upload.single('profileImage'),
    // (req: Request, res: Response, next: NextFunction) => {
    //     req.body = JSON.parse(req.body.data);
    //     next();
    // },
    AuthController.register);
authRouter.post('/login', validateRequest(loginUserValidation), AuthController.login);
authRouter.get('/users', auth('admin'), AuthController.getAllUsers);


authRouter.patch('/users/:id', AuthController.updateUser);

export default authRouter;
