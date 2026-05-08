import { body, param } from "express-validator";

export const userRules = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("age").isInt({ min: 1, max: 120 }).withMessage("Age must be between 1 and 120").toInt(),
  body("phone").trim().matches(/^\d{10}$/).withMessage("Phone must be 10 digits"),
  body("gender").isIn(["Male", "Female", "Other"]).withMessage("Invalid gender")
];

export const idRule = [
  param("id").isMongoId().withMessage("Invalid user id")
];