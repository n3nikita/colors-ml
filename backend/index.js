import express from "express";
import bodyParser  from 'body-parser';
import cors  from 'cors';

import train from './model.js';

const app = express();
app.use(bodyParser());
app.use(cors());  

app.post('/train', async (req, res) => {
  if (!req.body && !req.body.length) {
    return res.sendStatus(400);
  }
  
  // TODO: add logic
  res.sendStatus(200);
});

app.post('/predict', (req, res) => {
  if (!model && !req.body) {
    return res.sendStatus(400);
  }

  const { color } = req.body;
  // TODO: add logic

});

app.listen(3001, () => console.log('runnig'));