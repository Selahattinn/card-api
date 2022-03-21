module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/login", auth.login);
    app.use('/api/v1/auth', router);
  };