const Bugsnag = require('@bugsnag/js');
const BugsnagPluginExpress = require('@bugsnag/plugin-express');

// Configure Bugsnag with comprehensive settings
Bugsnag.start({
  apiKey: process.env.BUGSNAG_API_KEY || 'YOUR_BUGSNAG_API_KEY',
  appVersion: process.env.npm_package_version || '1.0.0',
  releaseStage: process.env.NODE_ENV || 'development',
  enabledReleaseStages: ['production', 'staging'],
  plugins: [BugsnagPluginExpress],
  
  // User context
  user: {
    id: process.env.HOSTNAME || 'unknown',
    name: 'DevOps Assessment App',
    email: 'devops@example.com'
  },
  
  // App context
  context: 'devops-assessment',
  
  // Metadata
  metadata: {
    app: {
      name: 'devops-assessment',
      environment: process.env.NODE_ENV || 'development',
      region: process.env.AWS_REGION || 'us-east-1',
      pod: process.env.HOSTNAME || 'local'
    },
    deployment: {
      version: process.env.npm_package_version || '1.0.0',
      buildId: process.env.GITHUB_SHA || 'unknown',
      branch: process.env.GITHUB_REF || 'unknown'
    }
  },
  
  // Error filtering
  beforeSend: function(report) {
    // Add custom logic to filter errors
    report.addMetadata('request', {
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
    return true;
  },
  
  // Breadcrumbs
  enabledBreadcrumbTypes: ['navigation', 'request', 'process', 'log', 'user', 'state', 'error', 'manual'],
  
  // Performance monitoring
  collectUserIp: false,
  generateAnonymousId: true
});

// Export for use in other modules
module.exports = Bugsnag;
