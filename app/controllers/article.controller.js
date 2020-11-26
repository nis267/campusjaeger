// const Article = require("../models/article.model.js");
const db = require("../models");
const Article = db.articles;
const Op = db.sequelize.Op;

// Create and Save a new Article
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Article
  const article = {
    name: req.body.name,
    author: req.body.author,
    text: req.body.text
  };

  // Save Article in the database
  Article.create(article)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Article."
      });
    });
};

// Retrieve all Articles from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Article.findAll({ where: { deleted: 0 } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    });
};


// Find a single Article with a articleId
exports.findOne = (req, res) => {
  const id = req.params.id;

  Article.findByPk({id, deleted: 0})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Article with id=" + id
      });
    });
};

// Update a Article identified by the articleId in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Article.update(req.body, {
    where: { id: id, deleted: 0 }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Article was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Article with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Article.update(
    {deleted: 1 },
    {where: { id: id, deleted: 0 }}
  )
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Article was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Article with id=${id}. Maybe Article was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Article with id=" + id
      });
    });
};
