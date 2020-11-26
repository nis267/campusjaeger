const sql = require("./db.js");

// constructor
const Article = function(article) {
  this.name = article.name;
  this.author = article.author;
  this.text = article.text;
};

Article.create = (newArticle, result) => {
  sql.query("INSERT INTO articles SET ?", newArticle, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created article: ", { id: res.insertId, ...newArticle });
    result(null, { id: res.insertId, ...newArticle });
  });
};

Article.findById = (articleId, result) => {
  sql.query(`SELECT * FROM articles WHERE id = ${articleId} and deleted = 0`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found article: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Article with the id
    result({ kind: "not_found" }, null);
  });
};

Article.findAll = result => {
  sql.query("SELECT * FROM articles WHERE deleted = 0", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("articles: ", res);
    result(null, res);
  });
};

//Update one article
Article.updateById = (id, article, result) => {
  sql.query(
    "UPDATE articles SET name = ?, author = ?, text = ?, publication_date = ? WHERE id = ? and deleted = 0",
    [article.name, article.author, article.text, article.publication_date, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Article with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated article: ", { id: id, ...article });
      result(null, { id: id, ...article });
    }
  );
};

// Remove one article (Soft delete)
Article.remove = (id, result) => {
  sql.query("UPDATE articles SET deleted = 1 WHERE id = ? AND deleted = 0", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Article with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted article with id: ", id);
    result(null, res);
  });
};

module.exports = Article;
