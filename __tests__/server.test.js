'use strict';

const server=require('../src/server');
require('@code-fellows/supergoose');
const superTest=require('supertest');
const serverRequest=superTest(server.app);
const base64=require('base-64');

describe('testing server',()=>{
  it('handle not found routes',async ()=>{
    let response= await serverRequest.get('/not-found');
    expect(response.status).toEqual(404);
  });
  it('handle server error',async ()=>{
    let response= await serverRequest.get('/badRequet');
    expect(response.status).toEqual(500);
  });
  it('handle home route',async ()=>{
    let response= await serverRequest.get('/');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('i am work');
  });
  it('Sign Up test',async ()=>{
    let response= await serverRequest.post('/signup').send({
      username:'areen',
      password:'1234',
    });
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('areen');
    expect(response.body.password).not.toEqual('1234');
  });
  it('Sign In test',async ()=>{
  
    const user = base64.encode('areen:1234');
    const response1 = await serverRequest.post('/signin').set('Authorization', `Basic ${user}`);
    expect(response1.status).toEqual(200);
    expect(response1.body.username).toEqual('areen');
    expect(response1.body.password).not.toEqual('1234');
  });
//   it('Sign In test failed',async ()=>{
 
//     const user = base64.encode('maria:1234');
//     const response1 = await serverRequest.post('/signin').set('Authorization', `Basic ${user}`);
//     expect(response1.status).toEqual(403);
  
//   });
});