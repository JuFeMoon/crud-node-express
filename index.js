const express = require('express');
const path = require('path');
const session = require('express-session');
var FileStore = require('session-file-store')(session);

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

app.use(express.static(path.join(__dirname, '/public'), {
  index: 'login.html'
}));

const usuariosRoutes = require("./routes/usuarios-routes");
const dashboardRoutes = require("./routes/dashboard-routes");

app.use(usuariosRoutes);
app.use(dashboardRoutes);

app.listen(3000, '0.0.0.0', () => console.log('Server running on port 3000'));