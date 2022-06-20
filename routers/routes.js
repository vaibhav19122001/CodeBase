const express = require('express');
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

router.route('/').get(loginGet).post(loginPost);
router.route('/login').get(loginGet).post(loginPost);
router.route('/signup').get(signupGet).post(signupPost);
router.route('/forgot').get(forgotGet).post(forgotPost);
router.route('/handle').get(handleGet).post(handlePost);
router.route('/otp').get(otpGet).post(otpPost);
router.route('/changePass').get(changePassGet).post(changePassPost);
router.route('/otpRe').post(otpRePost);
router.get('/topic',topicGet);
router.get('/home',homeGet);
router.get('/leaderboard',leaderboardGet);
router.get('/profile',profileGet);
router.get('/changeContent',changeContentGet);
router.get('/getUser',getUserGet);

module.exports = router;