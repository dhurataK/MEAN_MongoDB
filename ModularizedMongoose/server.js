const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = 8000;
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, './client/static')));
app.set('views', path.join(__dirname,'./client/views'));
app.set('view engine','ejs');

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(port, function() {
  console.log("Listening on port: "+port);
});
