import express from "express";
import bodyParser  from 'body-parser';
import cors  from 'cors';

import train from './model.js';

const app = express();
app.use(bodyParser());
app.use(cors());  

app.post('/', (req, res) => {
  train(req.body);
  res.send(200);
});

app.listen(3001, () => console.log('runnig'));