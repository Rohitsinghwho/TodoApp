import {Router} from 'express'
import { registerUser,LoginUser,LogoutUser} from "../controllers/users.controllers.js";
import { jwtVerity } from "../middlewares/auth.middlewares.js";

const router= Router();

//routes
router.route("/").post(registerUser);
router.route("/login").post(LoginUser)
router.route("/logout").post(jwtVerity,LogoutUser)

export default router;
