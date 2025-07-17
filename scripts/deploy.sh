#!/bin/bash

# DevOps Assessment Deployment Script
# This script automates the deployment process with optimization and troubleshooting

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOCKER_IMAGE="devops-assessment"
NAMESPACE="${NAMESPACE:-default}"
ENVIRONMENT="${ENVIRONMENT:-staging}"
REGION="${AWS_REGION:-us-east-1}"

# Functions
log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed"
        exit 1
    fi
    
    # Check kubectl
    if ! command -v kubectl &> /dev/null; then
        error "kubectl is not installed"
        exit 1
    fi
    
    # Check AWS CLI
    if ! command -v aws &> /dev/null; then
        error "AWS CLI is not installed"
        exit 1
    fi
    
    log "Prerequisites check passed"
}

# Build Docker image
build_image() {
    log "Building Docker image..."
    
    # Build with multi-stage optimization
    docker build \
        --build-arg NODE_ENV=production \
        --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
        --build-arg VCS_REF=$(git rev-parse --short HEAD) \
        -t ${DOCKER_IMAGE}:${GITHUB_SHA:-latest} \
        -t ${DOCKER_IMAGE}:latest \
        .
    
    log "Docker image built successfully"
}

# Run security scan
security_scan() {
    log "Running security scan..."
    
    # Scan with Trivy
    if command -v trivy &> /dev/null; then
        trivy image ${DOCKER_IMAGE}:latest --severity HIGH,CRITICAL --exit-code 1
    else
        warn "Trivy not installed, skipping security scan"
    fi
    
    log "Security scan completed"
}

# Push to registry
push_image() {
    log "Pushing image to registry..."
    
    # Tag for registry
    docker tag ${DOCKER_IMAGE}:latest ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${GITHUB_SHA:-latest}
    
    # Push to registry
    docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${GITHUB_SHA:-latest}
    
    log "Image pushed successfully"
}

# Deploy to Kubernetes
deploy_to_k8s() {
    log "Deploying to Kubernetes..."
    
    # Set environment variables for substitution
    export IMAGE_TAG=${GITHUB_SHA:-latest}
    export NODE_ENV=${ENVIRONMENT}
    
    # Apply Kubernetes manifests
    envsubst < k8s/deployment.yaml | kubectl apply -f -
    kubectl apply -f k8s/hpa.yaml
    kubectl apply -f k8s/ingress.yaml
    
    # Wait for deployment to complete
    log "Waiting for deployment to complete..."
    kubectl rollout status deployment/devops-assessment -n ${NAMESPACE} --timeout=300s
    
    log "Deployment completed successfully"
}

# Run smoke tests
run_smoke_tests() {
    log "Running smoke tests..."
    
    # Get service endpoint
    SERVICE_URL=$(kubectl get svc devops-assessment-service -n ${NAMESPACE} -o jsonpath='{.spec.clusterIP}')
    
    # Test health endpoint
    kubectl run smoke-test-$(date +%s) \
        --image=curlimages/curl:latest \
        --rm -i --restart=Never \
        --timeout=60s \
        -- curl -f "http://${SERVICE_URL}/health" || {
        error "Smoke tests failed"
        exit 1
    }
    
    log "Smoke tests passed"
}

# Performance optimization
optimize_performance() {
    log "Optimizing performance..."
    
    # Scale based on environment
    case ${ENVIRONMENT} in
        "production")
            kubectl scale deployment devops-assessment --replicas=5 -n ${NAMESPACE}
            ;;
        "staging")
            kubectl scale deployment devops-assessment --replicas=3 -n ${NAMESPACE}
            ;;
        *)
            kubectl scale deployment devops-assessment --replicas=2 -n ${NAMESPACE}
            ;;
    esac
    
    # Apply resource limits
    kubectl patch deployment devops-assessment -n ${NAMESPACE} -p '{
        "spec": {
            "template": {
                "spec": {
                    "containers": [{
                        "name": "devops-assessment",
                        "resources": {
                            "requests": {"memory": "128Mi", "cpu": "100m"},
                            "limits": {"memory": "256Mi", "cpu": "200m"}
                        }
                    }]
                }
            }
        }
    }'
    
    log "Performance optimization completed"
}

# Troubleshooting function
troubleshoot() {
    log "Starting troubleshooting..."
    
    # Check pod status
    kubectl get pods -n ${NAMESPACE} -l app=devops-assessment
    
    # Check logs
    kubectl logs -n ${NAMESPACE} -l app=devops-assessment --tail=50
    
    # Check events
    kubectl get events -n ${NAMESPACE} --sort-by=.metadata.creationTimestamp
    
    # Check resource usage
    kubectl top pods -n ${NAMESPACE} -l app=devops-assessment
    
    log "Troubleshooting information collected"
}

# Rollback function
rollback() {
    log "Rolling back deployment..."
    
    kubectl rollout undo deployment/devops-assessment -n ${NAMESPACE}
    kubectl rollout status deployment/devops-assessment -n ${NAMESPACE}
    
    log "Rollback completed"
}

# Main deployment function
main() {
    case ${1:-deploy} in
        "deploy")
            check_prerequisites
            build_image
            security_scan
            push_image
            deploy_to_k8s
            run_smoke_tests
            optimize_performance
            ;;
        "troubleshoot")
            troubleshoot
            ;;
        "rollback")
            rollback
            ;;
        *)
            echo "Usage: $0 {deploy|troubleshoot|rollback}"
            exit 1
            ;;
    esac
}

# Execute main function
main "$@"
