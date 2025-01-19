import * as tf from '@tensorflow/tfjs';

class InvestmentPredictor {
  constructor(historicalData) {
    this.historicalData = historicalData;
    this.model = null;
  }

  // Prepare data for training
  prepareData() {
    // Normalize data
    const prices = this.historicalData.map(d => d.closePrice);
    const normalizedPrices = this.normalizeData(prices);

    // Create sequences
    const sequenceLength = 30; // 30-day look-back
    const X = [];
    const y = [];

    for (let i = 0; i < normalizedPrices.length - sequenceLength; i++) {
      X.push(normalizedPrices.slice(i, i + sequenceLength));
      y.push(normalizedPrices[i + sequenceLength]);
    }

    return {
      X: tf.tensor2d(X),
      y: tf.tensor1d(y)
    };
  }

  // Normalize data
  normalizeData(data) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    return data.map(value => (value - min) / (max - min));
  }

  // Denormalize predictions
  denormalizeData(normalizedValue, originalData) {
    const min = Math.min(...originalData);
    const max = Math.max(...originalData);
    return normalizedValue * (max - min) + min;
  }

  // Build LSTM model
  buildModel(inputShape) {
    const model = tf.sequential();

    // LSTM Layer
    model.add(tf.layers.lstm({
      units: 50,
      returnSequences: false,
      inputShape: inputShape
    }));

    // Dense output layer
    model.add(tf.layers.dense({ units: 1 }));

    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError'
    });

    return model;
  }

  // Train the model
  async trainModel() {
    const { X, y } = this.prepareData();
    const inputShape = [X.shape[1], 1];

    this.model = this.buildModel(inputShape);

    await this.model.fit(X, y, {
      epochs: 100,
      batchSize: 32,
      callbacks: {
        onEpochEnd: (epoch, log) => {
          console.log(`Epoch ${epoch}: loss = ${log.loss}`);
        }
      }
    });
  }

  // Predict future prices
  predict(lookAheadDays = 30) {
    if (!this.model) {
      throw new Error('Model not trained');
    }

    const { X, y } = this.prepareData();
    const lastSequence = X.slice([X.shape[0] - 1, 0], [1, X.shape[1]]);

    const predictions = [];
    let currentSequence = lastSequence;

    for (let i = 0; i < lookAheadDays; i++) {
      const prediction = this.model.predict(currentSequence);
      predictions.push(prediction.dataSync()[0]);

      // Update sequence
      currentSequence = tf.concat([
        currentSequence.slice([0, 1], [1, currentSequence.shape[1] - 1]),
        prediction
      ], 1);
    }

    // Denormalize predictions
    const prices = this.historicalData.map(d => d.closePrice);
    return predictions.map(p => this.denormalizeData(p, prices));
  }

  // Risk analysis
  analyzeRisk(predictions) {
    const volatility = this.calculateVolatility(predictions);
    const confidenceInterval = this.calculateConfidenceInterval(predictions);

    return {
      volatility,
      confidenceInterval,
      riskScore: this.calculateRiskScore(volatility)
    };
  }

  calculateVolatility(data) {
    const mean = data.reduce((a, b) => a + b) / data.length;
    const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
    return Math.sqrt(variance);
  }

  calculateConfidenceInterval(data, confidenceLevel = 0.95) {
    const mean = data.reduce((a, b) => a + b) / data.length;
    const stdDev = this.calculateVolatility(data);
    const z = confidenceLevel === 0.95 ? 1.96 : 2.58; // Z-score for 95% or 99% confidence
    const marginOfError = z * (stdDev / Math.sqrt(data.length));

    return {
      lower: mean - marginOfError,
      upper: mean + marginOfError
    };
  }

  calculateRiskScore(volatility) {
    // Simple risk scoring mechanism
    if (volatility < 0.05) return 1; // Low risk
    if (volatility < 0.1) return 2;  // Medium risk
    return 3;  // High risk
  }
}

export default InvestmentPredictor;