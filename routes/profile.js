const express = require('express');
const router = express.Router();
const profileController = require('../controller/profile');

// path
router.post('/add-profile', profileController.addProfile);

router.post('/editprofile', profileController.updateProfile);

router.get('/getProfileById/:id', profileController.getProfileById);

module.exports = router;