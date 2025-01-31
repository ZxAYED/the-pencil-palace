import { Router } from "express";
import { AuthController } from "./auth.controller";
import { createUserValidation, loginUserValidation } from "./auth.validation";
import validateRequest from "../../utils/ValidateRequest";
import auth from "../../middleware/auth";

const authRouter = Router();

authRouter.post('/register', validateRequest(createUserValidation), AuthController.register);
authRouter.post('/login', validateRequest(loginUserValidation), AuthController.login);
authRouter.get('/users', auth('admin'), AuthController.getAllUsers);


authRouter.patch('/users/:id', AuthController.updateUser);

export default authRouter;
