const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');



//Get the signup form
router.get('/register', async(req, res)=>{
    res.render('Authentication/signup');
})

router.post('/register', async(req, res)=>{
    try{
        const user = new User({username: req.body.username, email: req.body.email});
        const newUser = await User.register(user, req.body.password);
        req.flash('success', 'Registered succesfully');
        res.redirect('/products');
    }
    catch (e){
        req.flash('error', e.message);
        res.redirect('/register')
    }
});

//Get the login form
router.get('/login', async(req, res)=>{
    res.render('Authentication/login');
})

router.post('/login', 
  passport.authenticate('local', 
    { 
      failureRedirect: '/login',
      failureFlash: true

    }),
    (req, res)=> {
        req.flash('success', `Welcome Back ${req.user.username}`);
        res.redirect('/products');
  });


//Logout the user
router.get('/logout', (req,res)=>{
    req.logout();
    req.flash('success', 'Logged out successfully');
    res.redirect('/login');
})


module.exports = router;
