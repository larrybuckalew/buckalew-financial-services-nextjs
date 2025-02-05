# Array of routes to test
$routes = @(
    "/",
    "/about",
    "/services",
    "/calculators",
    "/dashboard",
    "/register",
    "/blog",
    "/appointments",
    "/login",
    "/medicare",
    "/life-insurance",
    "/health-insurance",
    "/quote",
    "/contact"
)

# Function to check route
function Check-Route {
    param (
        [string]$route
    )

    Write-Host "Testing route: $route"
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000$route" -Method Head -ErrorAction Stop
        Write-Host "✓ Route $route is accessible (Status: $($response.StatusCode))" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Route $route failed (Status: $($_.Exception.Response.StatusCode.value__))" -ForegroundColor Red
    }
}

# Test each route
foreach ($route in $routes) {
    Check-Route -route $route
}
