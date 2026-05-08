import { body, param } from "express-validator";

export const createAddressRules = [
  body("userId").isMongoId().withMessage("Invalid user id"),
  body("address")
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Address must be 3 to 200 characters")
];

export const updateAddressRules = [
  param("id").isMongoId().withMessage("Invalid address id"),
  body("address")
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Address must be 3 to 200 characters")
];

export const userIdRule = [
  param("userId").isMongoId().withMessage("Invalid user id")
];