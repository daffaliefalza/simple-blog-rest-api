// import { Router } from "express";
// import Comment from "../models/comments.model.js";

// const router = Router({ mergeParams: true });

// router.get("/", async (req, res) => {
//   try {
//     const comments = await Comment.find({ post: req.params.postId });
//     res.json(comments);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     const newComment = new Comment({
//       content: req.body.content,
//       post: req.params.postId,
//     });
//     const savedComment = await newComment.save();

//     // Update the post's comments array
//     await Post.findByIdAndUpdate(
//       req.params.postId,
//       { $push: { comments: savedComment._id } },
//       { new: true }
//     );

//     res.status(201).json(savedComment);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// export default router;

// import { Router } from "express";
// import Comment from "../models/comments.model.js";
// import Post from "../models/posts.model.js";

// const router = Router({ mergeParams: true });

// // Get comments for a post
// router.get("/", async (req, res) => {
//   try {
//     const comments = await Comment.find({ post: req.params.postId }).sort({
//       createdAt: -1,
//     });
//     res.json(comments);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Add a new comment
// router.post("/", async (req, res) => {
//   try {
//     if (!req.body.content || typeof req.body.content !== "string") {
//       return res.status(400).json({ message: "Comment content is required" });
//     }

//     // Create new comment
//     const newComment = new Comment({
//       content: req.body.content,
//       post: req.params.postId,
//     });

//     // Save comment
//     const savedComment = await newComment.save();

//     // Update the post's comments array
//     await Post.findByIdAndUpdate(req.params.postId, {
//       $push: { comments: savedComment._id },
//     });

//     // Return the created comment
//     res.status(201).json(savedComment);
//   } catch (err) {
//     res.status(400).json({
//       message: "Error creating comment",
//       error: err.message,
//     });
//   }
// });

// export default router;

import { Router } from "express";
import Comment from "../models/comments.model.js";
import Post from "../models/posts.model.js";

const router = Router({ mergeParams: true });

// Get comments for a post with pagination
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 5;
    const skip = (page - 1) * pageSize;

    const comments = await Comment.find({ post: req.params.postId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    const totalComments = await Comment.countDocuments({
      post: req.params.postId,
    });

    res.json({
      data: comments,
      total: totalComments,
      page,
      pageSize,
      hasMore: skip + pageSize < totalComments,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new comment
router.post("/", async (req, res) => {
  try {
    if (!req.body.content || typeof req.body.content !== "string") {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const newComment = new Comment({
      content: req.body.content,
      post: req.params.postId,
    });

    const savedComment = await newComment.save();

    await Post.findByIdAndUpdate(req.params.postId, {
      $push: { comments: savedComment._id },
    });

    res.status(201).json(savedComment);
  } catch (err) {
    res.status(400).json({
      message: "Error creating comment",
      error: err.message,
    });
  }
});

export default router;
