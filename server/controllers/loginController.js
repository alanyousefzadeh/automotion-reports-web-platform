const jwt = require('jsonwebtoken');

//Creates & sends JWT for user authorization
exports.login = (req, res) => {
    const email = req.body.email;

    // Create an encrypted token
    const token = jwt.sign(
        { email: email },
        process.env.JWT_KEY,
        { expiresIn: "24h" }
    );

    res.json({ token });
};