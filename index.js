const yogasana = require('./routes/yoga/yogasana');
const db = require('mongoose');
const express = require('express');
const app = express();

db.connect('mongodb+srv://prateek:Clubpenguine%402214@openindicdb.1a9hyj0.mongodb.net/yoga?retryWrites=true&w=majority')
  .then(() => console.log('Connected to db...'))
  .catch((err) => console.log(err.message));

app.use('/api/yoga/yogasana', yogasana);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
