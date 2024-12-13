import express from 'express';
import { 
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import adminMiddleware from '../middleware/admin.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, getUsers);
router.get('/:id', getUser);
router.post('/create', authMiddleware, createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;