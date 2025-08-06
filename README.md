# Visitor Project

A new project with Docker containerization.

## Quick Start with Docker

### Prerequisites
- Docker
- Docker Compose

### Running the Application

1. **Build and start the containers:**
   ```bash
   docker-compose up --build
   ```

2. **Run in background:**
   ```bash
   docker-compose up -d
   ```

3. **Stop the containers:**
   ```bash
   docker-compose down
   ```

### Development

- The application runs on `http://localhost:3000`
- Health check endpoint: `http://localhost:3000/health`
- Code changes will automatically reload thanks to nodemon

### Docker Commands

- **Build image:** `docker build -t visitor .`
- **Run container:** `docker run -p 3000:3000 visitor`
- **View logs:** `docker-compose logs -f app`

## Project Structure

```
visitor/
├── Dockerfile          # Docker image configuration
├── docker-compose.yml  # Multi-container setup
├── .dockerignore       # Files to exclude from Docker build
├── package.json        # Node.js dependencies
├── index.js           # Main application file
└── README.md          # This file
``` 