# Project Name

Nusantaralens API

---

## Description

Nusantaralens API is the core backend service powering the Nusantaralens platform. It is designed to manage and deliver comprehensive data regarding Indonesian national heroes, regional languages, and diverse cultural heritage.

Built with a scalable Layered Architecture, this API serves as the vital bridge connecting various components of the ecosystem:

- AI Integration: Acts as the primary data provider for AI Chat services to ensure accurate cultural and historical context.

- Front-end Gateway: Delivers structured and responsive data to the Nusantaralens web interface.

- Data Management: Provides a centralized repository for Indonesia's rich historical and linguistic assets.

Project Status: 🚧 In Active Development – Implementing core entities and global error handling systems.

---

<!-- ## Features

- RESTful API architecture
- OpenAPI / Swagger documentation
- PostgreSQL database integration
- Error handling middleware
- Validation system
- Reusable response structure
- Authentication & authorization (optional)
- Redis caching (optional)
- RabbitMQ message queue (optional)

---

## Technologies Used

| Technology        | Description         |
| ----------------- | ------------------- |
| Node.js           | JavaScript runtime  |
| Express.js        | Backend framework   |
| PostgreSQL        | Relational database |
| Redis             | Caching system      |
| RabbitMQ          | Message queue       |
| Swagger / OpenAPI | API documentation   |
| JWT               | Authentication      |

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move to project directory:

```bash
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
PORT=
DATABASE_URL=
JWT_SECRET=
REDIS_URL=
RABBITMQ_URL=
```

Example:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/db_name
JWT_SECRET=your_secret_key
REDIS_URL=redis://localhost:6379
RABBITMQ_URL=amqp://localhost
```

---

## Running the Project

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

---

## API Documentation

Swagger documentation is available at:

```txt
http://localhost:3000/api-docs
```

---

## Response Structure

### Success Response

```json
{
  "status": "success",
  "message": "Request successful",
  "data": {}
}
```

### Failed Response

```json
{
  "status": "failed",
  "message": "Request failed"
}
```

### Error Response

```json
{
  "status": "error",
  "message": "Internal server error"
}
```

---

## Project Structure

```txt
src/
├── controllers/
├── routes/
├── services/
├── repositories/
├── middlewares/
├── validations/
├── docs/
├── config/
└── app.js
```

---

## API Endpoints Overview

| Method | Endpoint                   | Description           |
| ------ | -------------------------- | --------------------- |
| GET    | /heroes                    | Get all heroes        |
| GET    | /culture                   | Get all cultures      |
| GET    | /language/{iso_code}/words | Get words by language |

For complete API documentation, please visit the Swagger documentation.

---

## Error Handling

This API uses centralized error handling middleware to standardize all server responses and improve maintainability.

Internal server errors are hidden from clients to avoid exposing sensitive server information.

---

## Authentication

This API uses Bearer Token authentication.

Example:

```http
Authorization: Bearer <your_token>
```

---

## Testing

Run tests using:

```bash
npm test
```

---

## Deployment

This API can be deployed using:

- Vercel
- Railway
- Render
- VPS
- Docker

---
-->
## Author

Name: Gilang Mayong Saputra

GitHub: [https://github.com/MayongPutra14](https://github.com/MayongPutra14) 
