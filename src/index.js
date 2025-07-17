const express = require('express');
const Bugsnag = require('@bugsnag/js');
const BugsnagPluginExpress = require('@bugsnag/plugin-express');

// Initialize Bugsnag for error monitoring
Bugsnag.start({
  apiKey: process.env.BUGSNAG_API_KEY || 'YOUR_BUGSNAG_API_KEY',
  plugins: [BugsnagPluginExpress]
});

const app = express();
const PORT = process.env.PORT || 3000;

// Bugsnag middleware
const middleware = Bugsnag.getPlugin('express');
app.use(middleware.requestHandler);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// Main route
app.get('/', (req, res) => {
  res.json({
    message: 'DevOps Assessment Project',
    features: [
      'CI/CD with GitHub Actions and CircleCI',
      'Docker containerization',
      'Kubernetes deployment',
      'Monitoring with Datadog and Bugsnag',
      'Performance optimization'
    ],
    endpoints: {
      health: '/health',
      metrics: '/metrics',
      api: '/api/v1'
    }
  });
});

// API routes
app.get('/api/v1/status', (req, res) => {
  res.json({
    service: 'devops-assessment',
    environment: process.env.NODE_ENV || 'development',
    region: process.env.AWS_REGION || 'us-east-1',
    pod: process.env.HOSTNAME || 'local'
  });
});

// Metrics endpoint for monitoring
app.get('/metrics', (req, res) => {
  const metrics = {
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    uptime: process.uptime(),
    platform: process.platform,
    node_version: process.version
  };
  res.json(metrics);
});

// Error simulation endpoint for testing monitoring
app.get('/error', (req, res) => {
  const error = new Error('Simulated error for testing monitoring');
  Bugsnag.notify(error);
  res.status(500).json({ error: 'Simulated error triggered' });
});

// Bugsnag error handler
app.use(middleware.errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📈 Metrics: http://localhost:${PORT}/metrics`);
});

module.exports = app;