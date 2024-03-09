const { Router } = require('express');
const userController = require('../controllers/userController');
const {requireAuth} = require('../middleware/authCheck')

const router = Router();

router.get('/profile/:id',requireAuth, userController.get_user)
router.delete('/profile/:id',requireAuth, userController.delete );
router.put('/profile/:id',requireAuth, userController.update_profile );

module.exports = router;