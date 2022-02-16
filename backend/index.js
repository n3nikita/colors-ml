import express from 'express';
import cors  from 'cors';
import Model from './model.js';
import { generateTrainData } from './utils/colors.js';

const app = express();
app.use(express.json());
app.use(cors());  

const model = new Model();

app.post('/train', async (req, res) => {
  console.log(123);
  if (!req.body && !req.body.type) {
    return res.sendStatus(400);
  }

  let data;
  if (req.body.type === 'input' && req.body.data?.length) {
    data = req.body.data;
  } else {
    data = generateTrainData(1000);
  }
  
  await model.train(data);
  res.sendStatus(200);
});

app.post('/predict', async (req, res) => {
  if (!model && !req.body) {
    return res.sendStatus(400);
  }

  const { color } = req.body;
  let prediction = await model.predict(color);
  res.send(JSON.stringify(prediction));
});

app.listen(3001, () => console.log('runnig'));