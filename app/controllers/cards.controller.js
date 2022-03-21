const db = require("../models");
const Card = db.cards;
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;

// Create and Save a new card
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.surname || !req.body.phone || !req.body.company || !req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Tutorial
  const card = {
    username: req.body.username,
    name: req.body.name,
    surname: req.body.surname,
    company: req.body.company,
    phone: req.body.phone
  };
  // Save Card in the database
  Card.create(card)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};
// Get all Cards from the database.
exports.getAll = (req, res) => {
    Card.findAll({ where: { username: req.body.username } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
  };

// Update a Card by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Card.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Card was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Card was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Card with id=" + id
        });
      });
  };

  
// Delete a Card with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Card.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Card was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Card with id=${id}. Maybe Card was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Card with id=" + id
        });
      });
  };

// Delete all Cards specified username in the request
exports.deleteAll = (req, res) => {
    Card.destroy({
      where: {username: req.body.username},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };

//Search By keywords but uppercase not imported
exports.search = (req, res) => {
    const keyword = req.params.keyword;
    let lookupValue = keyword.toLowerCase();

    Card.findAll({
        where: {
            [Op.or]: [  

                { name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + lookupValue + '%') },
                { surname: sequelize.where(sequelize.fn('LOWER', sequelize.col('surname')), 'LIKE', '%' + lookupValue + '%') },
                { company: sequelize.where(sequelize.fn('LOWER', sequelize.col('company')), 'LIKE', '%' + lookupValue + '%') },
                { phone: sequelize.where(sequelize.fn('LOWER', sequelize.col('phone')), 'LIKE', '%' + lookupValue + '%')},
                // joins name and surname cols and search by word
                { nameAndSurname: sequelize.where(sequelize.fn('LOWER',sequelize.fn('concat', sequelize.col("name"), ' ',sequelize.col("surname"))), 'LIKE', '%' + lookupValue + '%')},
            ]
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        });
    });
};

/* exports.search = (req, res) => {
        const keyword = req.params.keyword;
        Card.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${keyword}%` } },
                    { surname: { [Op.iLike]: `%${keyword}%` } },
                    { company: { [Op.iLike]: `%${keyword}%` } },
                    { phone: { [Op.iLike]: `%${keyword}%` } }
                ]
            }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
    }; */