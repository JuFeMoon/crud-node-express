const express = require('express');
const path = require('path');
const session = require('express-session');
var FileStore = require('session-file-store')(session);
const dashboard = require 

const app = express();

app.use(express.json());

app.use(session(
  {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore({}),
    cookie: function (req) {
      var match = req.url.match(/^\/([^/]+)/);
      return {
        path: match ? '/' + match[1] : '/',
        httpOnly: true,
        secure: req.secure || false,
        maxAge: 60000
      };
    }
  }
));

app.use(express.static(path.join(__dirname, '/public')));

const usuariosRoutes = require("./routes/usuarios-routes");

app.use(usuariosRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));