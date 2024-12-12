import express from 'express';
import { 
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/create', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;