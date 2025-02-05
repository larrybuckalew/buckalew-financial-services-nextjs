#!/bin/bash

# Array of routes to test
ROUTES=(
  "/"
  "/about"
  "/services"
  "/calculators"
  "/dashboard"
  "/register"
  "/blog"
  "/appointments"
  "/login"
  "/medicare"
  "/life-insurance"
  "/health-insurance"
  "/quote"
  "/contact"
)

# Function to check route
check_route() {
  local route=$1
  echo "Testing route: $route"
  
  # Use curl to check if the route responds
  response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000$route)
  
  if [ "$response" -eq 200 ]; then
    echo "✓ Route $route is accessible"
  else
    echo "✗ Route $route failed (Status: $response)"
  fi
}

# Test each route
for route in "${ROUTES[@]}"; do
  check_route "$route"
done
