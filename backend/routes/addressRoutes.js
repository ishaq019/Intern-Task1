import { Router } from "express";
import {
  addAddress,
  getAddressByUser,
  getAddresses,
  updateAddress
} from "../controllers/addressController.js";
import validate from "../middleware/validate.js";
import {
  createAddressRules,
  updateAddressRules,
  userIdRule
} from "../validators/addressValidator.js";

const router = Router();

router.get("/", getAddresses);
router.get("/user/:userId", userIdRule, validate, getAddressByUser);
router.post("/", createAddressRules, validate, addAddress);
router.put("/:id", updateAddressRules, validate, updateAddress);

export default router;