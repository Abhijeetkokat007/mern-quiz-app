const express = require('express');
const cors = require('cors')
require('dotenv').config()
const dbConnection = require('./db.connection')
const quiz = require('./routes/quiz')
const path = require('path');

const PORT = process.env.PORT || 8080
const app = express()
// app.use(cors({
//   "origin": [ "https://mern-quiz-app-self.vercel.app/", "http://localhost:5173/"],
//   "methods": ["POST", "GET"],
//   "credentials": true
// }))
app.use((req, res, next) => {
  
  res.setHeader('Access-Control-Allow-Origin' , 'https://mern-quiz-app-self.vercel.app/' ,'http://localhost:5173' );
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  next();
});
app.use(express.json())
dbConnection()
app.use(quiz)

// app.get("/", async (req, res) => {
//   res.send("hello");
// });
const _dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(_dirname, '..', 'client', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, '..', 'client', 'dist', 'index.html'))
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})