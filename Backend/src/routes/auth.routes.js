const express = require("express");
const authController = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");

const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

const authRouter = express.Router();

/**
 * @Route POST /api/auth/register
 */

authRouter.post("/register", upload.single("profileImage"),authController.registerController)


/**
 * @Route POST /api/auth/login
 */
authRouter.post("/login",authController.loginController)


/**
 * @Route GET /api/auth/get-me
 * @description Get the currently logged in user's details
 * @access Private
 */
authRouter.get("/get-me", identifyUser, authController.getMeController)




module.exports = authRouter