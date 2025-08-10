const express = require('express');
const router = express.Router();
const Feedback= require('../model/Feedback');

router.post('/', async (req, res)=>{
    const {username, comments} = req.body;

if(!username, !comments){
    return res.status(400).json({error:"Missing fields"});
}

try{
    const newFeedback= new Feedback({username,comments});
    await newFeedback.save();
    res.status(201).json({message:"Feedback saved"});
} catch(err){
    res.status(500).json({error:"Error saving feedback"});
}
});

module.exports= router;