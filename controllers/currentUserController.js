const knex = require('knex')(require('../knexfile'));


exports.currentUser = (req, res) => {

    knex('users')
        .where({ email: req.user.email })
        .first()
        .then((user) => {
            // Respond with the user data
            delete user.password;
            res.json(user);
        });
};