const express = require("express");
const Joi = require("joi");

const userService = require("../services/userService");
const userRepository = require("../repositories/userRepository");

const router = express.Router();

userService.useRepository(userRepository);

// Define a Joi schema for user data validation
const userSchema = Joi.object({
  name: Joi.string().required(),
  sex: Joi.string().required(),
  age: Joi.number().integer().min(0).required(),
  country: Joi.string().required(),
});

router.post("/", async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const user = await userService.create(req.body);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
});

module.exports = router;
