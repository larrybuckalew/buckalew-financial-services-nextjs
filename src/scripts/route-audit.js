const fs = require('fs');
const path = require('path');

// Function to scan directory for routes
function scanDirectory(dir, routeType) {
  const routes = [];
  const baseDir = path.join(process.cwd(), 'src', dir);

  function scan(currentPath, routePath = '') {
    const entries = fs.readdirSync(currentPath);

    entries.forEach(entry => {
      const fullPath = path.join(currentPath, entry);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scan(fullPath, path.join(routePath, entry));
      } else if (
        (routeType === 'app' && entry === 'page.tsx') ||
        (routeType === 'pages' && entry.endsWith('.tsx'))
      ) {
        routes.push({
          path: routePath.replace(/\\/g, '/'),
          component: entry,
          fullPath: fullPath.replace(process.cwd(), '')
        });
      }
    });
  }

  scan(baseDir);
  return routes;
}

// Get all routes
const appRoutes = scanDirectory('app', 'app');
const pageRoutes = scanDirectory('pages', 'pages');

// Find conflicts
const conflicts = appRoutes.filter(appRoute => {
  const normalizedAppPath = appRoute.path || '/';
  return pageRoutes.some(pageRoute => {
    const normalizedPagePath = pageRoute.path.replace(/index$/, '') || '/';
    return normalizedAppPath === normalizedPagePath;
  });
});

// Generate report
const report = {
  summary: {
    totalAppRoutes: appRoutes.length,
    totalPageRoutes: pageRoutes.length,
    conflicts: conflicts.length
  },
  appRoutes,
  pageRoutes,
  conflicts
};

// Save report
fs.writeFileSync(
  path.join(process.cwd(), 'route-audit.json'),
  JSON.stringify(report, null, 2)
);

// Print summary
console.log('\nRoute Audit Summary:');
console.log('-----------------');
console.log(`App Routes: ${report.summary.totalAppRoutes}`);
console.log(`Pages Routes: ${report.summary.totalPageRoutes}`);
console.log(`Conflicts Found: ${report.summary.conflicts}`);
console.log('\nDetailed report saved to route-audit.json');