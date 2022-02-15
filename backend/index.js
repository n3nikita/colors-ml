import express from "express";
import cors  from 'cors';
import Model from './model.js';

const app = express();
app.use(express.json());
app.use(cors());  

const model = new Model();

app.post('/train', async (req, res) => {
  if (!req.body && !req.body.length) {
    return res.sendStatus(400);
  }
  
  await model.train(req.body);
  res.sendStatus(200);
});

app.post('/predict', (req, res) => {
  if (!model && !req.body) {
    return res.sendStatus(400);
  }

  const { color } = req.body;
  model.predict(color)
        .then((prediction) => {
          res.send(JSON.stringify(prediction));
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });

});

app.listen(3001, () => console.log('runnig'));