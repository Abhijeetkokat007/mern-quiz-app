const express = require('express');
const cors = require('cors')
require('dotenv').config()
const dbConnection = require('./db.connection')
const quiz = require('./routes/quiz')

const PORT = process.env.PORT || 8080
const app = express()
// app.use(cors({
//   "origin": [ "http://localhost:5173/"],
//   "methods": ["POST", "GET"],
//   "credentials": true
// }))
app.use((req, res, next) => {
  
  res.setHeader('Access-Control-Allow-Origin','http://localhost:5173' );
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  next();
});
app.use(express.json())
dbConnection()
app.use(quiz)

app.get("/", async (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})