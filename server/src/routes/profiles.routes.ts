import { Router } from 'express';
import { ProfilesService } from '@/services/profiles.service';
import { ProfilesController } from '@/controllers/profiles.controller';

const router = Router();
const service = new ProfilesService();
const controller = new ProfilesController(service);

router.get('/', controller.getAllProfiles);
router.post('/search', controller.searchProfiles);

export default router;
