const express = require('express');
const router = express.Router();
const {login,signup,forgot,topic,home,changeContent,leaderboard,profile,handle,getUser} = require('../controllers/controller');
router.get('/',login);
router.get('/login',login);
router.get('/signup',signup);
router.get('/forgot',forgot);
router.get('/topic',topic);
router.get('/home',home);
router.get('/leaderboard',leaderboard);
router.get('/profile',profile);
router.get('/changeContent',changeContent);
router.get('/handle',handle);
router.get('/getUser',getUser);
module.exports = router;