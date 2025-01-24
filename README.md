# Seo meta tags Web Application

## Overview

This is a fullstack web application built with:

- **Frontend**: React (using Inertia.js for seamless SPA-like navigation)
- **Backend**: AdonisJS (Node.js framework)
- **Database**: PostgreSQL
- **Queuing and Scheduling**: BullMQ with Redis

## Features

- Modern frontend using React and Inertia.js
- Backend powered by AdonisJS for API and server-side logic
- PostgreSQL for robust and scalable database management
- BullMQ and Redis for efficient task queuing and scheduling
- Dockerized environment for simplified setup and deployment

## Prerequisites

Ensure you have the following installed on your system:

- Docker and Docker Compose
- Node.js (v16 or higher)
- npm or yarn

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### Environment Configuration

Check `.env.example` and create a `.env` file in the root directory and configure the following variables:

### Start the Application in Development Mode

1. Start Docker Compose:

   ```bash
   docker-compose up -d
   ```

2. Run the application:

   ```bash
   npm run dev
   ```

3. If this is your first time setting up the application, run the database migrations:

   ```bash
   node ace migration:run
   ```

The application should now be running. Access it in your browser at `http://localhost:3000`.

## Project Structure

- **inertia/**: Contains React components and Inertia.js setup
- **app/**: AdonisJS application code (controllers, models, services, etc.)
- **database/**: Database schema and migrations and seeders
- **config/**: Configuration files for database, Redis, etc.
- **docker-compose.yml**: Docker Compose file for containerized services

## Queuing and Scheduling

This project uses BullMQ with Redis for task queuing and scheduling. The queues are configured in the AdonisJS backend. Ensure Redis is running via Docker Compose.

## Docker Setup

The `docker-compose.yml` file includes the following services:

- **app**: Runs the Node.js application
- **postgres**: PostgreSQL database
- **redis**: Redis server

### Useful Docker Commands

- View running containers:
  ```bash
  docker-compose ps
  ```
- Stop all containers:
  ```bash
  docker-compose down
  ```
- Restart containers:
  ```bash
  docker-compose restart
  ```

## Scripts

- `npm run dev`: Starts the development server
- `node ace migration:run`: Runs database migrations
- `node ace queue:work`: Starts the queue worker

## Contributing

Feel free to fork this repository and submit pull requests. Contributions are always welcome!

## License

This project is licensed under the GNU License.
