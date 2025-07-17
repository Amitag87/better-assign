const tracer = require('dd-trace');

// Initialize Datadog APM
tracer.init({
  service: 'devops-assessment',
  version: process.env.npm_package_version || '1.0.0',
  env: process.env.NODE_ENV || 'development',
  
  // Sampling
  sampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Profiling
  profiling: true,
  
  // Runtime metrics
  runtimeMetrics: true,
  
  // Logs correlation
  logInjection: true,
  
  // Tags
  tags: {
    'team': 'devops',
    'application': 'assessment',
    'region': process.env.AWS_REGION || 'us-east-1',
    'pod': process.env.HOSTNAME || 'local',
    'version': process.env.npm_package_version || '1.0.0'
  },
  
  // Plugin configuration
  plugins: true,
  
  // Debug mode (disable in production)
  debug: process.env.NODE_ENV !== 'production',
  
  // URL filtering
  url: (req) => {
    // Remove sensitive data from URLs
    return req.url.replace(/\/api\/v1\/users\/\d+/g, '/api/v1/users/?')
                 .replace(/token=[^&]+/g, 'token=?')
                 .replace(/api_key=[^&]+/g, 'api_key=?');
  }
});

// Custom metrics
const StatsD = require('node-statsd');
const client = new StatsD({
  host: process.env.DD_AGENT_HOST || 'localhost',
  port: process.env.DD_AGENT_PORT || 8125,
  prefix: 'devops.assessment.',
  tags: {
    env: process.env.NODE_ENV || 'development',
    service: 'devops-assessment',
    version: process.env.npm_package_version || '1.0.0'
  }
});

// Metrics helpers
const metrics = {
  // Counter for API requests
  incrementApiRequest: (endpoint, statusCode) => {
    client.increment('api.request.count', 1, [`endpoint:${endpoint}`, `status:${statusCode}`]);
  },
  
  // Histogram for response times
  recordResponseTime: (endpoint, duration) => {
    client.histogram('api.response.time', duration, [`endpoint:${endpoint}`]);
  },
  
  // Gauge for active connections
  setActiveConnections: (count) => {
    client.gauge('api.connections.active', count);
  },
  
  // Custom business metrics
  recordUserAction: (action, userId) => {
    client.increment('user.action', 1, [`action:${action}`, `user:${userId}`]);
  }
};

// Health check metrics
const recordHealthCheck = () => {
  const memUsage = process.memoryUsage();
  const cpuUsage = process.cpuUsage();
  
  client.gauge('system.memory.rss', memUsage.rss);
  client.gauge('system.memory.heapUsed', memUsage.heapUsed);
  client.gauge('system.memory.heapTotal', memUsage.heapTotal);
  client.gauge('system.cpu.user', cpuUsage.user);
  client.gauge('system.cpu.system', cpuUsage.system);
  client.gauge('system.uptime', process.uptime());
};

// Record health metrics every 30 seconds
setInterval(recordHealthCheck, 30000);

module.exports = { tracer, metrics, client };
