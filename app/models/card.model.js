module.exports = (sequelize, Sequelize) => {
    const Card = sequelize.define("card", {
      username: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      surname: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.JSON
      },
      company: {
        type: Sequelize.STRING
      },
    });
    return Card;
  };
