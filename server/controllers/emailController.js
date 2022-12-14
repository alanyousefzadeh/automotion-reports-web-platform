const emailSend = require('../emailTest');
const {request} = require("express");

exports.sendEmail = async (req, res) =>{
    // console.log(req.body.dataUri)
    // let fileName = req.body.dataUri.replace(/:\s*/g, "_");
    // console.log('fileName', fileName)
    let from = req.body.from;
    let to = req.body.to;
    let text = req.body.body;
    let emailSent = false
     emailSent = await emailSend(req.body.dataUri,from , to , text);
    console.log(emailSent)
    if (emailSent){
        res.send("The email has been sent successfully")
    }else {
        res.send("Send Failed, Please try again Later")
    }
};
