import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Utility to generate prediction visualization data
const preparePredictionData = (historicalData, predictions) => {
  const historicalDataWithPredictions = historicalData.map((data, index) => ({
    ...data,
    type: 'Historical'
  }));

  const predictionsData = predictions.map((price, index) => ({
    month: `Prediction ${index + 1}`,
    price,
    type: 'Prediction'
  }));

  return [...historicalDataWithPredictions, ...predictionsData];
};

const PredictionVisualization = ({ 
  historicalData, 
  predictions, 
  riskAnalysis 
}) => {
  const [visualizationData, setVisualizationData] = useState([]);

  useEffect(() => {
    if (historicalData && predictions) {
      setVisualizationData(preparePredictionData(historicalData, predictions));
    }
  }, [historicalData, predictions]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Investment Prediction</h2>
        <div className="flex space-x-2">
          <div className="flex items-center">
            <span className="w-3 h-3 bg-blue-500 mr-2 rounded-full"></span>
            <span className="text-sm">Historical</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-green-500 mr-2 rounded-full"></span>
            <span className="text-sm">Prediction</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={visualizationData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip 
            formatter={(value, name, props) => [
              `$${value.toLocaleString()}`, 
              props.payload.type
            ]} 
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#8884d8" 
            strokeWidth={2} 
            dot={{ strokeWidth: 2, r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {riskAnalysis && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 grid grid-cols-3 gap-4"
        >
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-blue-600">Volatility</h3>
            <p className="text-xl font-bold">{riskAnalysis.volatility.toFixed(4)}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-green-600">Confidence Interval</h3>
            <p className="text-xl font-bold">
              ${riskAnalysis.confidenceInterval.lower.toFixed(2)} - 
              ${riskAnalysis.confidenceInterval.upper.toFixed(2)}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-red-600">Risk Score</h3>
            <p className="text-xl font-bold">{riskAnalysis.riskScore}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PredictionVisualization;