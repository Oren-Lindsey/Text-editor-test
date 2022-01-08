const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const Database = require("@replit/database")
const bodyParser = require("body-parser");
const sanitizeHtml = require('sanitize-html');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = new Database()
var dbData = "<p>Hey there</p>"
db.set("currentValue", dbData).then(() => {dbUpdated(dbData)});

function dbUpdated(dbData) {
  global.currentValue = {"currentValue":dbData}
  console.log(dbData)
}

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html');
})

app.get('/api/current-value', (req, res) => {
  db.get("currentValue").then(value => {
    res.send(currentValue);
  });
})

app.post('/api/current-value', (req, res) => {
  console.log(req.body.content);
  const clean = sanitizeHtml(req.body.content)
  db.set("currentValue", clean).then(() => {dbUpdated(clean)});
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Example app listening at https://express-example-app.s40.repl.co`)
})