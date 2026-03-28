import { Router } from 'express';
import { getMessages, createMessage, updateMessageStatus } from './messages.controller.js';

const router = Router();

router.get('/', getMessages);
router.post('/', createMessage);
router.patch('/:id/status', updateMessageStatus);

export default router;
