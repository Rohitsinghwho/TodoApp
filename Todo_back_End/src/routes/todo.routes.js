import { Router } from "express";
import { jwtVerity } from "../middlewares/auth.middlewares.js";
import {
    AddNotes,
    UpdateNotes,
    DeleteNotes,
    getNotebyId
} from "../controllers/todo.controllers.js"


const router=Router();
router.use(jwtVerity)

// @route   POST api/notes
router.route("/AddNote").post(AddNotes)
router.route("/UpdateNote/:noteId").patch(UpdateNotes)
router.route("/DeleteNote/:noteId").delete(DeleteNotes)
router.route("/getNoteById/:noteId").get(getNotebyId);

export default router