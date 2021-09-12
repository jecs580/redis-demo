const express = require('express');
const axios = require('axios');
const responseTime = require('response-time');
const redis = require('redis');

const client = redis.createClient({
    host:'localhost',
    port:6379
})

const app =  express();

app.use(responseTime())
app.get('/characters',async(req, res)=>{
    client.get('characters', async(err,reply)=>{
        if(reply){
            return res.json(JSON.parse(reply))
        }
        const response = await axios.get(`https://rickandmortyapi.com/api/character`);
        client.set('characters', JSON.stringify(response.data),(err,reply)=>{
        if(err)console.log(err);
        console.log(reply);
        })
        return res.json(response.data);
    })
    
})

app.listen(3000)
console.log('Server on port 3000');