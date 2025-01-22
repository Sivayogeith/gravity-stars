import express from "express";
const __dirname = import.meta.dirname;
const app = express();

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(7890, () => {
  console.log('Server listening on http://localhost:7890');
});
