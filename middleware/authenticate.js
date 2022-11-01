const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    // If there is no auth header provided
    console.log("line5",req.headers.authorization)
    console.log("line6", req.body)
    console.log("req", req)
    if (req.headers.authorization === undefined) {
        console.log("login")
        return res.status(401).send("login credentials required");
    }

    // Parse the Bearer token
    const authToken = req.headers.authorization.split(" ")[1];
    
    // Verify the token
    jwt.verify(authToken, process.env.JWT_KEY, (err, decoded) => {
        // Sends 401 status if JWT not valid
        if (err) {
            return res.status(401).send("Invalid auth token");
        } 
        //req.user = decoded;
        next();
    });

}
module.exports = authenticate;