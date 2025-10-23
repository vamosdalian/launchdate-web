# LaunchDate Web

A modern web application for tracking rocket launches, companies, launch bases, and space news. Built with React, TypeScript, and Vite.

## 🚀 Features

- **Launch Tracking**: View upcoming and past rocket launches
- **Rocket Database**: Browse detailed information about different rockets
- **Company Profiles**: Explore space companies and their missions
- **Launch Bases**: Discover launch facilities around the world
- **Space News**: Stay updated with the latest space industry news
- **Responsive Design**: Optimized for desktop and mobile devices

## 📋 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Next-generation frontend tooling
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Class Variance Authority** - Component variant management

## 🛠️ Development

### Prerequisites

- Node.js 20+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/vamosdalian/launchdate-web.git
cd launchdate-web

# Install dependencies
npm install
```

### Development Server

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build
```

The production-ready files will be in the `dist` directory.

### Linting

```bash
# Run ESLint
npm run lint
```

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

## 🐳 Docker

### Building the Docker Image

```bash
# Build the Docker image
docker build -t launchdate-web .
```

### Running the Container

```bash
# Run the container
docker run -p 8080:80 launchdate-web
```

The application will be available at `http://localhost:8080`

### Pull from GitHub Container Registry

After a release is tagged, the image is automatically built and pushed to GitHub Container Registry:

```bash
# Pull the latest image
docker pull ghcr.io/vamosdalian/launchdate-web:latest

# Run the container
docker run -p 8080:80 ghcr.io/vamosdalian/launchdate-web:latest
```

## 📦 Deployment

The application uses a multi-stage Docker build process:

1. **Build Stage**: Compiles the TypeScript and bundles the application with Vite
2. **Production Stage**: Serves static files using nginx for optimal performance

The nginx configuration includes:
- Gzip compression for faster loading
- Security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
- Client-side routing support for React Router
- Aggressive caching for static assets
- Health check endpoint

## 🔄 CI/CD

GitHub Actions automatically builds and publishes Docker images when a new tag is pushed:

```bash
# Create and push a new tag
git tag v1.0.0
git push origin v1.0.0
```

The workflow will:
1. Build the Docker image
2. Tag it with the version number
3. Push to GitHub Container Registry (ghcr.io)

## 📁 Project Structure

```
launchdate-web/
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── types/          # TypeScript type definitions
│   ├── data/           # Static data
│   ├── assets/         # Images and static files
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Public static files
├── .github/
│   └── workflows/      # GitHub Actions workflows
├── Dockerfile          # Docker build configuration
├── nginx.conf          # Nginx server configuration
└── package.json        # Project dependencies
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.
