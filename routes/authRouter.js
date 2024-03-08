const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/', (req, res)=> {
    res.send("<h1 style='font-family:verdana;'>Welcome!</h1>");
})

router.post('/signup', authController.signup );
router.post('/login', authController.login );

module.exports = router;