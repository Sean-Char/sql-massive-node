

module.exports = {

  createProducts: function(req, res, next) {
    var db = req.app.get('db')
    db.create_product([req.body.name, req.body.description, req.body.price, req.body.imageUrl])
    .then(function(results) {
      res.send(results)
    })
  }

  readProducts: function(req, res, next) {
    var db = req.app.get('db')
    db.read_products()
    .then(function(results) {
      res.send(results)
    })
  }

  readProduct: function(req, res, nex) {

  }

  updateProduct: function(req, res, nex) {

  }

  deleteProduct: function(req, res, nex) {

  }



}
