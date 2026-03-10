const express = require("express");
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router();


/**
 * @Route POST /api/users/follow/:username
 * @description Follow a user
 * @access Private
 */
userRouter.post("/follow/:username", identifyUser, userController.followUserController)



/**
 * @Route POST /api/users/unfollow/:username
 * @description Unfollow
 * @access Private
 */
userRouter.post("/unfollow/:username", identifyUser, userController.unFollowUserController)



/**
 * @Route GET /api/users/:username/follow-stats
 * @description Get followers and following count
 */
userRouter.get("/:username/follow-stats", userController.followStatsController)



module.exports = userRouter