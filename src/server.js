'use strict';

const express=require('express');

const errorHandler=require('./handlers/500');
const notFoundHandler=require('./handlers/404');
const users=require('./auth/signInUp');


const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(users);

//add routes 
app.get('/',(request,response)=>{
  console.log('i am work');
  response.status(200).send('i am work');
});


app.get('/badRequet',(req,res)=>{
  throw new Error('manual error');
});

//handler Middlewares
app.use('*',notFoundHandler);
app.use(errorHandler);

function start(PORT){
  app.listen(PORT,()=>{
    console.log(`App is Runnning on ${PORT}`);
  });
}

module.exports={
  app:app,
  start:start,
};