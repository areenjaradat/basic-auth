'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('./models/user');
const basicAuth = require('./middleware/signin');
const router=express.Router();


router.post('/signup',signUp);
router.post('/signin', basicAuth,signIn);


async function signUp(req,res){
  try{
    req.body.password=await bcrypt.hash(req.body.password,10);
    const user =new UserModel(req.body);
    const record=await user.save(req.body);
    res.status(200).json(record);
  }catch(e) {
    res.status(403).send('Error Happened!');
  }
}

async function signIn(req,res){
  try{
    const user=await UserModel.findOne(({username: req.user.username}));
    const valid = await bcrypt.compare(req.user.password, user.password);
    console.log('valid : ', valid);
    if (valid) {
      res.status(200).json(user);
      console.log('user',user);
    } else {
      res.status(403).send('Wrong username or password');
    }
  }catch(error) {
    console.log(error);
    res.status(403).send(error);
  }
}
module.exports = router;