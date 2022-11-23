const emailSend = require('../emailTest');
const {request} = require("express");

exports.sendEmail = (req, res) =>{
    // console.log(req.body.dataUri)
    // let fileName = req.body.dataUri.replace(/:\s*/g, "_");
    // console.log('fileName', fileName)
    let from = req.body.from;
    let to = req.body.to;
    let text = req.body.body;
    emailSend(req.body.dataUri,from , to , text);
    // res.send("")
}; 

