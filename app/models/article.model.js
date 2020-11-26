
module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("article", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        name: {
          type: Sequelize.STRING
          allowNull: false
        },
        author: {
          type: Sequelize.STRING
          allowNull: false
        },
        text: {
          type: Sequelize.STRING
          allowNull: false
        },
        creation_date: {
          type: 'TIMESTAMP',
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        publication_date: {
          type: 'TIMESTAMP',
          defaultValue: 0,
        },
        deleted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        }

      });
    
      return Article;
}