'use strict';

require('dotenv').config();
const moongose=require('mongoose');
const PORT =process.env.PORT || 3000;

const server=require('./src/server');

const MONGODB_URI = process.env.MONGODB_URI;

moongose.connect(MONGODB_URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify:false,
  useCreateIndex:true,
}).then(()=> console.log('conntected to mongoDB'));

server.start(PORT);