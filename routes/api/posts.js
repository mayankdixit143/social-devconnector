const express = require("express");
const router = express.Router();
const Error = require("../../errors");
const apiHandler = require("../../apiHandler");
const Posts = require("../../controllers/posts");
const passport = require("passport");

/**
 * @route   GET api/posts/test
 * @desc    Tests posts route
 * @access  Public
 */
router.get("/test", async (req, res) => {
  try {
    let postsService = new Posts();
    let response = await postsService.testUser();
    apiHandler(req, res, Promise.resolve(response));
  } catch (err) {
    console.log(err);
    apiHandler(req, res, Promise.reject(err));
  }
});
/**
 * @route   POST api/posts/
 * @desc    Create post
 * @access  Private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let postsService = new Posts();
      let response = await postsService.createPost(req.user, req.body);
      apiHandler(req, res, Promise.resolve(response));
    } catch (err) {
      console.log(err);
      apiHandler(req, res, Promise.reject(err));
    }
  }
);
/**
 * @route GET api/posts/
 * @desc Get all post
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    let postService = new Posts();
    let response = await postService.getAllPost();
    apiHandler(req, res, Promise.resolve(response));
  } catch (err) {
    apiHandler(req, res, Promise.reject(err));
  }
});
/**
 * @route GET api/posts/:id
 * @desc Get post by post ID
 * @access Public
 */
router.get("/:id", async (req, res) => {
  try {
    let postService = new Posts();
    let response = await postService.getPostById(req.params.id);
    apiHandler(req, res, Promise.resolve(response));
  } catch (err) {
    apiHandler(req, res, Promise.reject(err));
  }
});
/**
 * @route DELETE api/posts/:id
 * @desc Delete the post by ID
 * @access Private
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const postService = new Posts();
      let response = await postService.deletePostById(req.user, req.params.id);
      apiHandler(req, res, Promise.resolve(response));
    } catch (err) {
      apiHandler(req, res, Promise.reject(err));
    }
  }
);

module.exports = router;
