const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cookieParser = require('cookie-parser');

const app = express();
const db = config.get('mongouri');

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
    .then(() => console.log('Mongodb connected ...'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', require('./router/api/v1'));
app.use('/api/user', require('./router/api/user'));
app.use('/api/model', require('./router/api/model'));
app.use(express.static('client/build'));
    
const port = 5000;
app.listen(port, () => console.log(`Server started at port ${port}`));
