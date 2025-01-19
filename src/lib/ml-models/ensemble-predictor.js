import * as tf from '@tensorflow/tfjs';
import * as math from 'mathjs';

class EnsembleFinancialPredictor {
  constructor(historicalData, modelConfigs = {}) {
    this.historicalData = historicalData;
    this.models = [];
    this.modelConfigs = {
      lstm: { layers: [100, 50], dropout: 0.2 },
      gru: { layers: [80, 40], dropout: 0.15 },
      simpleRNN: { layers: [64, 32], dropout: 0.1 },
      ...modelConfigs
    };
  }

  // Prepare multi-feature dataset
  prepareData() {
    const features = [
      'closePrice',
      'volume',
      'marketCap',
      'volatility'
    ];

    // Normalize each feature
    const normalizedFeatures = features.map(feature => 
      this.normalizeData(this.historicalData.map(d => d[feature]))
    );

    const sequenceLength = 60; // 60-day lookback
    const X = [];
    const y = [];

    for (let i = 0; i < normalizedFeatures[0].length - sequenceLength; i++) {
      const sequence = features.map((_,j) => 
        normalizedFeatures[j].slice(i, i + sequenceLength)
      );

      X.push(sequence);
      y.push(normalizedFeatures[0][i + sequenceLength]);
    }

    return {
      X: tf.tensor3d(X),
      y: tf.tensor1d(y)
    };
  }

  // Build different neural network architectures
  buildModel(type, inputShape) {
    const config = this.modelConfigs[type];
    const model = tf.sequential();

    model.add(tf.layers.inputLayer({ inputShape }));

    // Dynamic layer generation based on configuration
    config.layers.forEach((units, index) => {
      const isLast = index === config.layers.length - 1;

      if (type === 'lstm') {
        model.add(tf.layers.lstm({
          units,
          returnSequences: !isLast,
          dropout: config.dropout,
          recurrentDropout: config.dropout
        }));
      } else if (type === 'gru') {
        model.add(tf.layers.gru({
          units,
          returnSequences: !isLast,
          dropout: config.dropout,
          recurrentDropout: config.dropout
        }));
      } else if (type === 'simpleRNN') {
        model.add(tf.layers.rnn({
          units,
          returnSequences: !isLast,
          dropout: config.dropout
        }));
      }

      if (!isLast) {
        model.add(tf.layers.dropout({ rate: config.dropout }));
      }
    });

    model.add(tf.layers.dense({ units: 1 }));

    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError',
      metrics: ['mae']
    });

    return model;
  }

  // Train ensemble of models
  async trainEnsemble(epochs = 200, batchSize = 32) {
    const { X, y } = this.prepareData();
    const inputShape = X.shape.slice(1);

    const modelTypes = ['lstm', 'gru', 'simpleRNN'];

    // Train multiple models
    this.models = await Promise.all(
      modelTypes.map(async (type) => {
        const model = this.buildModel(type, inputShape);

        // Early stopping
        const earlyStoppingCallback = tf.callbacks.earlyStopping({
          monitor: 'val_loss',
          patience: 10
        });

        await model.fit(X, y, {
          epochs,
          batchSize,
          validationSplit: 0.2,
          callbacks: [
            earlyStoppingCallback,
            {
              onEpochEnd: (epoch, logs) => {
                console.log(`${type} - Epoch ${epoch}: loss = ${logs.loss}`);
              }
            }
          ]
        });

        return { type, model };
      })
    );
  }

  // Advanced ensemble prediction
  predict(lookAheadDays = 30) {
    if (this.models.length === 0) {
      throw new Error('Models not trained');
    }

    const { X } = this.prepareData();
    const lastSequence = X.slice([X.shape[0] - 1, 0], [1, X.shape[1]]);

    // Ensemble prediction with weighted average
    const predictions = this.models.map(({ type, model }) => {
      const modelPredictions = [];
      let currentSequence = lastSequence;

      for (let i = 0; i < lookAheadDays; i++) {
        const prediction = model.predict(currentSequence);
        const predValue = prediction.dataSync()[0];
        modelPredictions.push(predValue);

        // Update sequence
        currentSequence = tf.concat([
          currentSequence.slice([0, 1], [1, currentSequence.shape[1] - 1]),
          prediction
        ], 1);
      }

      return modelPredictions;
    });

    // Weighted ensemble prediction
    const ensemblePredictions = predictions[0].map((_, dayIndex) => {
      const dayPredictions = predictions.map(modelPreds => modelPreds[dayIndex]);
      return math.mean(dayPredictions);
    });

    // Compute prediction intervals
    const simulationResults = this.runMonteCarloSimulation(ensemblePredictions);

    return simulationResults;
  }

  // Monte Carlo simulation for prediction intervals
  runMonteCarloSimulation(predictions, numSimulations = 1000) {
    const simulationResults = [];

    for (let i = 0; i < predictions.length; i++) {
      const dayPredictions = [];

      for (let j = 0; j < numSimulations; j++) {
        // Add noise to simulate market uncertainty
        const noisyPrediction = predictions[i] + 
          (Math.random() - 0.5) * predictions[i] * 0.05;
        dayPredictions.push(noisyPrediction);
      }

      simulationResults.push({
        median: math.median(dayPredictions),
        lowerBound: math.quantileSeq(dayPredictions, 0.05),
        upperBound: math.quantileSeq(dayPredictions, 0.95)
      });
    }

    return simulationResults;
  }

  // Feature importance analysis
  analyzeFeatureImportance() {
    // Placeholder for advanced feature importance calculation
    return {
      closePrice: 0.4,
      volume: 0.3,
      marketCap: 0.2,
      volatility: 0.1
    };
  }
}

export default EnsembleFinancialPredictor;