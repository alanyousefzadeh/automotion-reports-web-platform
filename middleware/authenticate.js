const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    
    // Parse the Bearer token
    const authToken = req.headers.authorization.split(" ")[1];
    
    // If there is no auth header provided
    if (authToken === null) {
        return res.status(401).send("Please login");
    }
    
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