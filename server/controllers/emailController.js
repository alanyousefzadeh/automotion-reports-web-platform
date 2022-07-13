const emailSend = require('../emailTest');

exports.sendEmail = (req, res) =>{
    console.log(req.body)
    let fileName = req.body.file.replace(/:\s*/g, "_");
    console.log('fileName', fileName)
    emailSend(fileName);
    // res.send("")
}; 

