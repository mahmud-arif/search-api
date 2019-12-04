const express = require('express');
const cors = require('cors');
const search = require('./search'); 

const app = express();


app.use(cors());


app.get('/api/:term', async (req, res) => {
  const term = req.params.term; 
  const response = await search(term); 
  res.json(response)
})


app.listen('5001', () => {
  console.log('server is running on port 5001')
})