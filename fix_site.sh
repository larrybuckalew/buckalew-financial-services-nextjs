#!/bin/bash
echo "Cleaning and reinstalling dependencies..."
rm -rf node_modules
rm package-lock.json
npm cache clean --force
npm install
echo "Building the project..."
npm run build
echo "Starting development server..."
npm run dev
