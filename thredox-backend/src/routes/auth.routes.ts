import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

router.get('/google/callback', AuthController.handleCallback);
router.post('/refresh', AuthController.refreshToken);
router.post('/revoke', AuthController.revokeAccess);

export default router;
