const express = require('express');
const checkAuth=require('../middlewares/checkAuth');
const entryAuth=require('../middlewares/entryAuth');
const router = express.Router();
const {
    loginGet,
    signupGet,
    forgotGet,
    handleGet,
    otpGet,
    changePassGet,
    loginPost,
    signupPost,
    forgotPost,
    handlePost,
    otpPost,
    changePassPost,
    otpRePost
} = require('../controllers/entryController');

const {
    topicGet,
    homeGet,
    changeContentGet,
    leaderboardGet,
    profileGet,
    getUserGet
}=require('../controllers/apiController');

router.route('/').get(entryAuth,loginGet).post(entryAuth,loginPost);
router.route('/login').get(entryAuth,loginGet).post(entryAuth,loginPost);
router.route('/signup').get(entryAuth,signupGet).post(entryAuth,signupPost);
router.route('/forgot').get(entryAuth,forgotGet).post(entryAuth,forgotPost);
router.route('/handle').get(handleGet).post(handlePost);
router.route('/otp').get(otpGet).post(otpPost);
router.route('/changePass').get(changePassGet).post(changePassPost);
router.route('/otpRe').post(otpRePost);
router.get('/topic',checkAuth,topicGet);
router.get('/home',checkAuth,homeGet);
router.get('/leaderboard',checkAuth,leaderboardGet);
router.get('/profile',checkAuth,profileGet);
router.get('/changeContent',checkAuth,changeContentGet);
router.get('/getUser',getUserGet);

module.exports = router;