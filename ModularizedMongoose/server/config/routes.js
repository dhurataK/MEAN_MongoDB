const Animals = require('../controllers/animals.js');
module.exports = function(app) {
  app.get('/', function(req, res) {
    res.redirect('/animals');
  });
  app.get('/animals', Animals.index);
  app.get('/animals/new', Animals.new);
  app.post('/animals', Animals.create);
  app.get('/animals/:id', Animals.show);
  app.get('/animals/:id/edit',Animals.edit);
  app.post('/animals/:id', Animals.update);
  app.post('/animals/:id/destroy', Animals.delete);
}
