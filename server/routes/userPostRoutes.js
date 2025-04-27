import express from 'express';
import { createPost, getPosts, getPostById,likePost } from '../controllers/controllersPost.js';
import { checkAuth } from '../middlewares/auth.js'; // Import the middleware

const router = express.Router();

router.post('/', checkAuth, createPost); // Protect this route
router.get('/', getPosts);
router.get('/:id', getPostById);
//router.put('/:id', checkAuth, updatePost); // Protect this route
//router.delete('/:id', checkAuth, deletePost); // Protect this route
router.post('/:postId/like', checkAuth, likePost);
export default router;