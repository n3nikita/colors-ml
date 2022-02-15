import * as tf from '@tensorflow/tfjs-node';

export default class Model {
  constructor() {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 3, inputShape: [3] }));
    model.add(tf.layers.dense({ units: 2, activation: 'softmax' }));
    model.compile({
      optimizer: tf.train.adam(),
      loss: 'sparseCategoricalCrossentropy',
      metrics: ['accuracy'],
    });

    this._model = model;
  }

  async train(data, options = {}) {
    const {
      epochs = 100,
      batchSize = 16,
      callbackFolder = 'tmp',
    } = options;
    const normalisedData = data.map((e) =>
      e.color.map((c) => this._normalize(c)),
    );
    let trainData = tf.tensor(normalisedData);
    let trainLabels = tf.tensor(data.map((e) => e.type));

    return await this._model.fit(trainData, trainLabels, {
      epochs,
      batchSize,
      validationData: [trainData, trainLabels],
      callbacks: tf.node.tensorBoard(`./model-data/${callbackFolder}`),
    });
  }
}