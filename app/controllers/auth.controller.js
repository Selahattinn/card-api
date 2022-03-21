const accessTokenSecret = 'secret';
const jwt = require('jsonwebtoken');

// Create and Save a new card
exports.login = (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.password) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    if (req.body.username === 'jhon' && req.body.password === '12345' ){
        const accessToken = jwt.sign({ username: "jhon" }, accessTokenSecret);
    
        res.status(200).json({
            accessToken
        });
        return
    }
    res.status(401).send({
        message: "Invalid credentials!"
        });

  };