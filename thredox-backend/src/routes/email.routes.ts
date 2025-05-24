import { Router } from 'express';
import { EmailController } from '../controllers/email.controller';
import { checkAuth } from '../middlewares/auth';

const router = Router();

// Apply auth middleware to all routes
router.use(checkAuth);

router.get('/', EmailController.getEmails);
router.get('/:id', EmailController.getEmailById);
router.post('/sync', EmailController.triggerSync);
router.get('/sync/status', EmailController.getSyncStatus);

export default router;
