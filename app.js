require('dotenv').config();
const initDb = require("./db/init");
initDb();
const express = require('express');
const path = require('path');
const routes = require('./routers/routes');
const app = express();
const cookieSession = require('cookie-session')
const session = require('express-session')
const PORT = process.env.PORT || 3000;
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));
app.use(express.static(path.join(__dirname,'./styles')));
app.use(express.urlencoded());
app.use(express.json());
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
  }))
  /*app.use(cookieSession({
    name: 'session',
    keys: [0],
  
    // Cookie Options
    maxAge: 5 * 60 * 1000 // 5 min
  }))*/
app.use('/',routes);
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
});
