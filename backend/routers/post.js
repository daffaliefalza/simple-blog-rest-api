// import { Router } from "express";
// import commentRouter from "./comment.js";

// import Post from "../models/posts.model.js";

// const router = Router();

// // const posts = [
// //   { id: 1, title: "first post", content: "this is my first post" },
// //   { id: 2, title: "second post", content: "this is my second post" },
// //   { id: 3, title: "third post", content: "this is my third post" },
// //   { id: 4, title: "fourth post", content: "this is my fourth post" },
// // ];

// router.get("/:postId", async (req, res) => {
//   const result = await Post.findById(req.params.postId);
//   res.json(result);

//   // const results = posts.filter((item, idx) => {
//   //   return Number(req.params.postId) === item.id;
//   // });
//   // res.json(results);
// });

// router.use("/:postId/comments", commentRouter);

// router.get("/", async (req, res) => {
//   const { keyword } = req.query;

//   if (!keyword) {
//     res.json(await Post.find());
//   }

//   // const posts = await Post.find();

//   const findPosts = await Post.find({
//     $or: [
//       { title: { $regex: `.*${keyword}.*` } },
//       { content: { $regex: `.*${keyword}.*` } },
//     ],
//   });

//   res.json(findPosts);

//   // res.json(posts);
// });

// router.post("/", async (req, res) => {
//   const { title, content } = req.body;

//   const createdPost = await Post.create({
//     title,
//     content,
//   });

//   res.status(201).json(createdPost);

//   // const id = posts[posts.length - 1].id + 1;

//   // const newPost = {
//   //   id,
//   //   title,
//   //   content,
//   // };

//   // posts.push(newPost);
//   // res.status(201).json(newPost);
// });

// // local
// // router.put("/:postId", (req, res) => {
// //   const postId = req.params.postId;
// //   const { title, content } = req.body;
// //   const idx = posts.findIndex((item) => item.id == postId);
// //   const post = posts[idx];

// //   post.title = title;
// //   post.content = content;

// //   res.json(post);
// // });

// router.put("/:postId", async (req, res) => {
//   const postId = req.params.postId;
//   const { title, content } = req.body;

//   const updatedPost = await Post.findByIdAndUpdate(
//     postId,
//     {
//       title,
//       content,
//     },
//     {
//       returnDocument: "after",
//     }
//   );

//   res.json(updatedPost);
// });

// // using database
// // router.put("/:postId", async (req, res) => {
// //   const { title, content } = req.body;

// //   try {
// //     const updatedPost = await Post.findByIdAndUpdate(
// //       req.params.postId,
// //       { title, content },
// //       { new: true, runValidators: true }
// //     );

// //     if (!updatedPost) {
// //       return res.status(404).json({ message: "Post not found" });
// //     }

// //     res.json(updatedPost);
// //   } catch (err) {
// //     res.status(500).json({ message: "Server error", error: err.message });
// //   }
// // });

// // using local
// // router.delete("/:postId", (req, res) => {
// //   const postId = Number(req.params.postId);
// //   const post = posts.find((item) => item.id === postId);

// //   if (!post) {
// //     return res.status(404).json({ message: "Post not found" });
// //   }

// //   const updatedPosts = posts.filter((item) => item.id !== postId);

// //   posts.length = 0; // clear the array
// //   posts.push(...updatedPosts); // repopulate it

// //   res.json({ message: "Post deleted", post });
// // });

// // using db

// router.delete("/:postId", async (req, res) => {
//   try {
//     const deletedPost = await Post.findByIdAndDelete(req.params.postId);

//     if (!deletedPost) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     res.json({ message: "Post deleted", post: deletedPost });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// export default router;

import { Router } from "express";
import commentRouter from "./comment.js";
import Post from "../models/posts.model.js";
import Comment from "../models/comments.model.js"; // Add this import

const router = Router();

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.use("/:postId/comments", commentRouter);

router.get("/", async (req, res) => {
  try {
    const { keyword } = req.query;
    let posts;

    if (keyword) {
      posts = await Post.find({
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { content: { $regex: keyword, $options: "i" } },
        ],
      });
    } else {
      posts = await Post.find();
    }

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({ title, content });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Also delete associated comments
    await Comment.deleteMany({ post: req.params.postId });

    // Return proper success response
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      post: deletedPost,
    });
  } catch (err) {
    console.error("Delete error:", err); // Add this for debugging
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
});

// router.delete("/:postId", async (req, res) => {
//   try {
//     const deletedPost = await Post.findByIdAndDelete(req.params.postId);
//     if (!deletedPost) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     // Also delete associated comments
//     await Comment.deleteMany({ post: req.params.postId });

//     res.json({ message: "Post deleted", post: deletedPost });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

export default router;
