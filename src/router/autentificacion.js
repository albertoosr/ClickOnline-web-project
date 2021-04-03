const express = require('express')
const router = express.Router()
const passport = require('passport')
const { isLoggedIn } = require('../lib/session')

//CRUD DB 
// inicio de sesiòn
router.post('/login', (req, res, next) => {
    passport.authenticate('local.login', {
       successRedirect: '/user/index',
       failureRedirect: '/',
       failureFlash: true 
    })(req, res, next);
});

//Registro de usuario
router.post('/register', passport.authenticate('local.registro', {
    successRedirect: '/user/index',
    failureRedirect: '/',
    failureFlash: true
}));

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }    
        res.cookie(prop, '', {expires: new Date(0)});
    }
    res.redirect('/');
 });
 

module.exports = router