const { Router } = require('express');
const userController = require('../controllers/userController');
const {requireAuth} = require('../middleware/authCheck')

const router = Router();

router.get('/profile/:id',requireAuth, userController.get_user)
router.delete('/profile/:id', userController.delete );
router.put('/profile/:id', userController.update_profile );

module.exports = router;