'use strict';

const base64=require('base-64');

module.exports=(req,res,next)=>{
  let basicHeader = req.headers.authorization.split(' ');
  let encoded = basicHeader.pop(); 
 
  let decoded = base64.decode(encoded); 
  let [username, password] = decoded.split(':');
  if (username && password) {
  //  console.log('req>>>>>>>>>>>>',req);
    req.user = { username, password };
    //  console.log('req.user....',req.user);
    next();
  } else {
    next('invalid signin');
  } 
};

