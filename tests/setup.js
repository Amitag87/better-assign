// Test setup file for Jest

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';
process.env.BUGSNAG_API_KEY = 'test-key';
process.env.DD_API_KEY = 'test-key';

// Mock external services
jest.mock('../monitoring/bugsnag-config', () => ({
  notify: jest.fn(),
  leaveBreadcrumb: jest.fn(),
  setUser: jest.fn(),
  addMetadata: jest.fn()
}));

jest.mock('../monitoring/datadog-config', () => ({
  tracer: {
    init: jest.fn(),
    trace: jest.fn()
  },
  metrics: {
    incrementApiRequest: jest.fn(),
    recordResponseTime: jest.fn(),
    setActiveConnections: jest.fn(),
    recordUserAction: jest.fn()
  },
  client: {
    increment: jest.fn(),
    gauge: jest.fn(),
    histogram: jest.fn()
  }
}));

// Global test helpers
global.delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Console suppression for cleaner test output
if (process.env.NODE_ENV === 'test') {
  console.log = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
}

// Cleanup after each test
afterEach(() => {
  jest.clearAllMocks();
});
