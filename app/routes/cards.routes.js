module.exports = app => {
    const cards = require("../controllers/cards.controller.js");
    var router = require("express").Router();
    authMiddleware = require('../middleware/auth.middleware.js');

    router.use(authMiddleware.authenticateJWT);

    // Create a new Card
    router.post("/", cards.create);

    // Get All Cards
    router.get("/", cards.getAll);

    //Update a Card
    router.put("/:id", cards.update);

    // Delete a Card with id
    router.delete("/:id", cards.delete);

    // Delete all Cards with specsific user
    router.delete("/", cards.deleteAll);

    // Search By keywords
    router.get("/search/:keyword", cards.search);

    app.use('/api/v1/card', router);
  };