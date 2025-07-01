import { Router } from "express";
import commentRouter from "./comment.js";

const router = Router();

const posts = [
  { id: 1, title: "first post", content: "this is my first post" },
  { id: 2, title: "second post", content: "this is my second post" },
  { id: 3, title: "third post", content: "this is my third post" },
  { id: 4, title: "fourth post", content: "this is my fourth post" },
];

router.get("/:postId", (req, res) => {
  const results = posts.filter((item, idx) => {
    return Number(req.params.postId) === item.id;
  });
  res.json(results);
});

router.use("/:postId/comments", commentRouter);

router.get("/", (req, res) => {
  res.json(posts);
});

router.post("/", (req, res) => {
  const { title, content } = req.body;
  const id = posts[posts.length - 1].id + 1;

  const newPost = {
    id,
    title,
    content,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

router.put("/:postId", (req, res) => {
  const postId = req.params.postId;
  const { title, content } = req.body;
  const idx = posts.findIndex((item) => item.id == postId);
  const post = posts[idx];

  post.title = title;
  post.content = content;

  res.json(post);
});

router.delete("/:postId", (req, res) => {
  const postId = Number(req.params.postId);
  const post = posts.find((item) => item.id === postId);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const updatedPosts = posts.filter((item) => item.id !== postId);

  posts.length = 0; // clear the array
  posts.push(...updatedPosts); // repopulate it

  res.json({ message: "Post deleted", post });
});

export default router;
