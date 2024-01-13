import {Router} from 'express'
import { registerUser
    ,LoginUser
    ,LogoutUser,
    deleteUser,
    UpdateDetails,
    getUser,

} from "../controllers/users.controllers.js";
import { jwtVerity } from "../middlewares/auth.middlewares.js";

const router= Router();

//routes
router.route("/").post(registerUser);
router.route("/login").post(LoginUser)
router.route("/logout").post(jwtVerity,LogoutUser)
router.route("/delete").delete(jwtVerity,deleteUser)
router.route("/updateDetails").patch(jwtVerity,UpdateDetails)
router.route("/getUser").get(jwtVerity,getUser)
export default router;
