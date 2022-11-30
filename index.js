const express = require('express');
const app = express();
//by default website run on port 80
const port =8000;
const expressLayout= require('express-ejs-layouts');

app.use(expressLayout);

app.use('/',require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if(err){
        //interpolation using backtick ``
        console.log(`Error: ${err}`);
    }
    console.log(`Server is running on port ${port}`);
});