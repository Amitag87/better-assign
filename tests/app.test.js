const request = require('supertest');
const app = require('../src/index');

describe('DevOps Assessment API', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(3001, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('GET /', () => {
    it('should return application information', async () => {
      const response = await request(server).get('/');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('DevOps Assessment Project');
      expect(response.body).toHaveProperty('features');
      expect(response.body.features).toContain('CI/CD with GitHub Actions and CircleCI');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(server).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('version');
    });
  });

  describe('GET /api/v1/status', () => {
    it('should return service status', async () => {
      const response = await request(server).get('/api/v1/status');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('service', 'devops-assessment');
      expect(response.body).toHaveProperty('environment');
      expect(response.body).toHaveProperty('region');
      expect(response.body).toHaveProperty('pod');
    });
  });

  describe('GET /metrics', () => {
    it('should return system metrics', async () => {
      const response = await request(server).get('/metrics');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('memory');
      expect(response.body).toHaveProperty('cpu');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('platform');
      expect(response.body).toHaveProperty('node_version');
    });
  });

  describe('GET /error', () => {
    it('should simulate error and return 500', async () => {
      const response = await request(server).get('/error');
      
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Simulated error triggered');
    });
  });

  describe('GET /nonexistent', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(server).get('/nonexistent');
      
      expect(response.status).toBe(404);
    });
  });
});

describe('Environment Variables', () => {
  it('should handle missing environment variables gracefully', () => {
    const originalEnv = process.env.NODE_ENV;
    delete process.env.NODE_ENV;
    
    // Test that app still works without NODE_ENV
    expect(() => require('../src/index')).not.toThrow();
    
    // Restore original env
    process.env.NODE_ENV = originalEnv;
  });
});

describe('Performance Tests', () => {
  it('should handle multiple concurrent requests', async () => {
    const promises = [];
    
    for (let i = 0; i < 10; i++) {
      promises.push(request(server).get('/health'));
    }
    
    const responses = await Promise.all(promises);
    
    responses.forEach(response => {
      expect(response.status).toBe(200);
    });
  });

  it('should respond within acceptable time limits', async () => {
    const start = Date.now();
    const response = await request(server).get('/');
    const duration = Date.now() - start;
    
    expect(response.status).toBe(200);
    expect(duration).toBeLessThan(1000); // Should respond within 1 second
  });
});
