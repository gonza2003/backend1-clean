import {Router} from 'express';
import {UserManager} from '../managers/UserManager.js';

const router = Router();

router.post('/', async (req, res) => {
    const user = await UserManager.register(req.body);
    res.redirect (`/home/${user.id}`)
});

export default router;