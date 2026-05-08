import { Router } from "express";
import { addUser, deleteUser, getUsers, updateUser } from "../controllers/userController.js";
import validate from "../middleware/validate.js";
import { idRule, userRules } from "../validators/userValidator.js";

const router = Router();

router.get("/", getUsers);
router.post("/", userRules, validate, addUser);
router.put("/:id", idRule, userRules, validate, updateUser);
router.delete("/:id", idRule, validate, deleteUser);

export default router;