import * as tf from '@tensorflow/tfjs-node';

const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [3] }));
model.compile({
  loss: 'meanSquaredError',
  optimizer: 'sgd',
  metrics: ['MAE']
});


// Generate some random fake data for demo purpose.
// const xs = tf.randomUniform([10000, 3]);
// const ys = tf.randomUniform([10000, 1]);
// const valXs = tf.randomUniform([1000, 3]);
// const valYs = tf.randomUniform([1000, 1]);


// Start model training process.

async function train(data) {
  console.log(data);
  let xs = tf.tensor(data.map(e => e.color));
  let ys = tf.tensor(data.map(e => e.type));
  console.log(xs);
  console.log(ys);

  await model.fit(xs, ys, {
    epochs: 100,
    validationData: [xs, ys],
    // Add the tensorBoard callback here.
    callbacks: tf.node.tensorBoard('./tmp')
  });


  console.log(model.predict([[255,255,255]]))
}
// train();
export default train;