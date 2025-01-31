import { Router } from "express";
import { AuthController } from "./auth.controller";
import { createUserValidation, forgotPasswordValidation, loginUserValidation } from "./auth.validation";
import validateRequest from "../../utils/ValidateRequest";

import upload from "../../utils/multer.config";

const authRouter = Router();

authRouter.post('/register', validateRequest(createUserValidation), upload.single('profileImage'),
    // (req: Request, res: Response, next: NextFunction) => {
    //     req.body = JSON.parse(req.body.data);
    //     next();
    // },
    AuthController.register);
authRouter.post('/login', validateRequest(loginUserValidation), AuthController.login);
authRouter.post('/change-password', validateRequest(forgotPasswordValidation), AuthController.changePassword);
authRouter.post('/request-password-reset', validateRequest(forgotPasswordValidation), AuthController.requestPasswordReset);
authRouter.post('/reset-password', AuthController.resetPassword);




export default authRouter;
