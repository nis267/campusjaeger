module.exports = app => {
    const articles = require("../controllers/article.controller.js");
  
    // Create a new Article
    app.post("/articles", articles.create);
  
    // Get all Articles
    app.get("/articles", articles.findAll);
  
    // Get a single Article with articleId
    app.get("/articles/:id", articles.findOne);
  
    // Update a Article with articleId
    app.put("/articles/:id", articles.update);
  
    // Delete a Article with articleId
    app.delete("/articles/:id", articles.delete);
  
  };