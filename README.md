# DevOps Assessment Project

A comprehensive Node.js application demonstrating DevOps best practices including CI/CD pipelines, containerization, monitoring, and deployment automation.

## 🚀 Features

- **CI/CD Pipelines**: Automated workflows using GitHub Actions and CircleCI
- **Containerization**: Docker containerization with multi-stage builds and security best practices
- **Kubernetes Deployment**: Production-ready K8s manifests with auto-scaling and monitoring
- **Application Monitoring**: Integrated Datadog APM and Bugsnag error tracking
- **Security**: Vulnerability scanning, secrets management, and security policies
- **Performance Optimization**: Resource management, caching, and performance monitoring

## 📋 Project Structure

```
devops-assessment-project/
├── .github/
│   └── workflows/
│       └── ci-cd.yml              # GitHub Actions CI/CD pipeline
├── .circleci/
│   └── config.yml                 # CircleCI configuration
├── k8s/
│   ├── deployment.yaml            # Kubernetes deployment manifests
│   ├── hpa.yaml                   # Horizontal Pod Autoscaler
│   └── ingress.yaml               # Ingress and NetworkPolicy
├── monitoring/
│   ├── bugsnag-config.js          # Bugsnag error monitoring setup
│   └── datadog-config.js          # Datadog APM configuration
├── scripts/
│   └── deploy.sh                  # Deployment automation script
├── src/
│   └── index.js                   # Main application entry point
├── tests/
│   └── app.test.js                # Jest test suites
├── Dockerfile                     # Docker container configuration
├── package.json                   # Node.js dependencies and scripts
└── README.md                      # This file
```

## 🛠️ Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Testing**: Jest, Supertest
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions, CircleCI
- **Monitoring**: Datadog, Bugsnag
- **Security**: Trivy, npm audit

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker
- kubectl
- AWS CLI (for EKS deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone repository-url
   cd devops-assessment-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run the application**
   ```bash
   npm start
   ```

5. **Run tests**
   ```bash
   npm test
   ```

The application will be available at `http://localhost:3000`

## 🐳 Docker Deployment

### Build and run locally

```bash
# Build the Docker image
docker build -t devops-assessment .

# Run the container
docker run -p 3000:3000 devops-assessment
```

### Using npm scripts

```bash
# Build Docker image
npm run docker:build

# Run Docker container
npm run docker:run
```

## ☸️ Kubernetes Deployment

### Deploy to Kubernetes

```bash
# Apply all manifests
kubectl apply -f k8s/

# Or use the deployment script
./scripts/deploy.sh deploy
```

### Environment Variables

Set these environment variables before deployment:

```bash
export NAMESPACE=production
export DOCKER_REGISTRY=ghcr.io/your-username
export BUGSNAG_API_KEY=your-bugsnag-key
export DATADOG_API_KEY=your-datadog-key
```

## 📊 Monitoring & Observability

### Datadog Integration

The application includes comprehensive Datadog monitoring:

- **APM Tracing**: Automatic request tracing
- **Custom Metrics**: Business and system metrics
- **Log Correlation**: Centralized logging
- **Performance Profiling**: CPU and memory profiling

### Bugsnag Error Tracking

Integrated error monitoring with:

- **Automatic Error Capture**: Unhandled exceptions
- **Custom Error Reporting**: Business logic errors
- **Performance Monitoring**: Request performance tracking
- **User Context**: Request metadata and user information

### Available Endpoints

- `GET /` - Application information
- `GET /health` - Health check endpoint
- `GET /metrics` - System metrics
- `GET /api/v1/status` - Service status
- `GET /error` - Error simulation (for testing monitoring)

## 🔄 CI/CD Pipeline

### GitHub Actions

The GitHub Actions workflow (`/.github/workflows/ci-cd.yml`) includes:

1. **Testing**: Unit tests, linting, coverage
2. **Security**: Vulnerability scanning with Trivy
3. **Build**: Docker image creation and push
4. **Deploy**: Automated deployment to staging/production
5. **Monitoring**: Smoke tests and notifications

### CircleCI

Alternative CI/CD pipeline (`/.circleci/config.yml`) with:

- Parallel job execution
- Docker layer caching
- Approval workflows for production
- Comprehensive testing and security scanning

### Pipeline Triggers

- **Push to `main`**: Deploys to production
- **Push to `develop`**: Deploys to staging
- **Pull Requests**: Runs tests and security scans

## 🔧 Troubleshooting

### Common Issues

1. **Container won't start**
   ```bash
   # Check logs
   docker logs container-id
   
   # Check resource usage
   docker stats container-id
   ```

2. **Kubernetes deployment fails**
   ```bash
   # Use troubleshooting script
   ./scripts/deploy.sh troubleshoot
   
   # Check pod status
   kubectl get pods -l app=devops-assessment
   
   # Check logs
   kubectl logs -l app=devops-assessment
   ```

3. **Performance issues**
   ```bash
   # Check resource usage
   kubectl top pods -l app=devops-assessment
   
   # Scale up replicas
   kubectl scale deployment devops-assessment --replicas=5
   ```

### Deployment Scripts

The deployment script (`/scripts/deploy.sh`) provides:

- **deploy**: Full deployment process
- **troubleshoot**: Diagnostic information
- **rollback**: Rollback to previous version

Usage:
```bash
./scripts/deploy.sh deploy
./scripts/deploy.sh troubleshoot
./scripts/deploy.sh rollback
```

## 📈 Performance Optimization

### Application Level

- **Resource Limits**: CPU and memory constraints
- **Health Checks**: Liveness and readiness probes
- **Auto-scaling**: HPA based on CPU/memory usage
- **Caching**: Response caching strategies

### Infrastructure Level

- **Multi-stage Builds**: Optimized Docker images
- **Layer Caching**: Efficient CI/CD pipelines
- **Load Balancing**: Multiple replicas with service mesh
- **Monitoring**: Performance metrics and alerting

## 🔐 Security

### Container Security

- **Non-root User**: Running as non-privileged user
- **Read-only Filesystem**: Immutable container filesystem
- **Security Context**: Pod security policies
- **Vulnerability Scanning**: Trivy security scans

### Network Security

- **Network Policies**: Ingress/egress restrictions
- **TLS Termination**: SSL/TLS encryption
- **Rate Limiting**: Request rate limiting
- **Secrets Management**: Kubernetes secrets

## 📝 Development

### Adding New Features

1. Create feature branch
2. Implement changes with tests
3. Run local tests: `npm test`
4. Create pull request
5. CI/CD pipeline runs automatically

### Code Quality

- **ESLint**: Code linting
- **Jest**: Unit testing
- **Coverage**: Test coverage reporting
- **Security**: Automated security scanning

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For questions or support:

- Create an issue in the repository
- Check the troubleshooting section
- Review the deployment logs
- Contact the DevOps team

## 🎯 Assessment Criteria Covered

This project demonstrates:

1. **✅ CI/CD Pipelines**: GitHub Actions and CircleCI implementation
2. **✅ Cloud Deployments**: Docker and Kubernetes automation
3. **✅ Monitoring**: Datadog and Bugsnag integration
4. **✅ Troubleshooting**: Comprehensive debugging and optimization tools

---

*Built with ❤️ for DevOps assessment*
