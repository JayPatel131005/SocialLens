const router = require('express').Router();
const{register,login} = require('../Controllers/UserControllers');

router.post('/register',register);
router.post('/login',login);

module.exports = router; 
     