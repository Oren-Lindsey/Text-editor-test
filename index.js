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
db.set("currentContent", dbData).then(() => {contentUpdated(dbData)});
db.set("currentContent", "Title").then(() => {titleUpdated(dbData)});

function contentUpdated(dbData) {
  global.currentContent = {"currentContent":dbData}
  console.log(dbData)
}
function titleUpdated(dbData) {
  global.currentTitle = {"currentContent":dbData}
  console.log(dbData)
}

app.use(express.static('public'))

//Homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html');
})

//Get current value
app.get('/api/current-value', (req, res) => {
  db.get("currentContent").then(value => {
    var currentVals = {}
    currentVals["currentBody"] = currentContent
    currentVals["currentTitle"] = currentTitle
    console.log(currentVals)
    res.send(currentVals)
  });
})

//Set current value
app.post('/api/current-value', (req, res) => {
  console.log(req.body);
  const cleanContent = sanitizeHtml(req.body.content)
  const cleanTitle = sanitizeHtml(req.body.title)
  db.set("currentContent", cleanContent).then(() => {contentUpdated(cleanContent)});
  db.set("currentTitle", cleanTitle).then(() => {titleUpdated(cleanTitle)});
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Example app listening at https://express-example-app.s40.repl.co`)
})