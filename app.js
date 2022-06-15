require('dotenv').config();
const express = require('express');
const path = require('path');
const routes = require('./routers/routes');
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));
app.use(express.static(path.join(__dirname,'./styles')));
app.use(express.urlencoded());
app.use('/',routes);
app.listen(PORT,()=>{
    console.log('Server online !!');
});
