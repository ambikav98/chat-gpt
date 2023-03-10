const { Configuration, OpenAIApi } = require("openai");
const express=require('express')
const cors=require('cors')
const json=require('body-parser')


// import { Configuration, OpenAIApi } from "openai";

// import express from 'express';
// import { json } from 'body-parser';
// import cors from 'cors';


const configuration = new Configuration({
    organization: "org-3UJENqaG6eREJVcg9AJsSz4w",
    apiKey:"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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

// const { Configuration, OpenAIApi } = require("openai");
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

//create a simple  express api that calls the function
//add body parser and cors to express 

const app=express()
//can you please add cors to express

app.use(json())
app.use(cors())

// app.use(express.json())
// app.use(express.urlencoded({extended:true}))

const port=3080

app.post('/', async(req,res)=>{
    const {message,currentModel}=req.body;
    console.log(message,"message")
    console.log(currentModel)
    console.log(currentModel)
    const response = await openai.createCompletion({
         model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
      console.log(response.data.choices[0].text)
    res.json({
        // data:response.data,
        // data:message,
        message:response.data.choices[0].text
    })
    // console.log(data)
})


app.get('/models',async(req,res)=>{
    const response = await openai.listEngines();
    console.log(response.data.data)
    res.json({
        models:response.data.data
    })
    console.log(response.data.data)
})


app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
})