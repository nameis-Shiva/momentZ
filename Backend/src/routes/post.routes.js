const express = require("express")
const postRouter = express.Router();
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware")


/**
 * @Route POST /api/posts [protected]
 * @description Create a new post, the request should contain the caption and the image file, the image file should be uploaded to imagekit and the url should be stored in the database
 * @access Private
 */

postRouter.post("/",upload.single("image"), identifyUser, postController.createPostController)


/**
 * @Route GET /api/posts/ [protected]
 * @description Get all posts of the user, the user should be identified by the token and only the posts of the user should be returned
 * @access Private
 */
postRouter.get("/", identifyUser, postController.getPostController)


/**
 * @Route GET /api/posts/details/:postId
 * @description Get the details of a post, the user should be identified by the token and only the details of the post should be returned
 * @access Private
 */
postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController)


/**
 * @route POST  /api/posts/like/:postId
 * @description like a post with the ID provided in the request in the params.
 * @access Private
 */

postRouter.post("/like/:postId",identifyUser ,postController.likePostController )

/**
 * @route POST  /api/posts/unlike/:postId
 * @description unlike a post with the ID provided in the request in the params.
 * @access Private
 */

postRouter.post("/unlike/:postId",identifyUser ,postController.unLikePostController )


/**
 * @route GET /api/posts/feed
 * @description Get all the posts from DB
 * @access Private
 */

postRouter.get("/feed", identifyUser, postController.getFeedController) 





module.exports = postRouter;