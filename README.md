# Notes App — Backend

REST API for the notes demo app. Built with Express and MongoDB, with JWT-based authentication.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in this directory (do not commit it):

   ```env
   MONGO_URI=mongodb://localhost:27017/notes-app
   JWT_SECRET=your_secret_key_here
   PORT=5000
   ```

   | Variable     | Description                                      |
   | ------------ | ------------------------------------------------ |
   | `MONGO_URI`  | MongoDB connection string                        |
   | `JWT_SECRET` | Secret used to sign and verify JWT tokens        |
   | `PORT`       | Server port (defaults to `5000` if omitted)      |

## Running the server

```bash
node server.js
```

For development with auto-restart:

```bash
npx nodemon server.js
```

The API listens at `http://localhost:5000` (or your configured `PORT`).

## API endpoints

### Authentication (`/auth`)

| Method | Path        | Body                          | Description                    |
| ------ | ----------- | ----------------------------- | ------------------------------ |
| POST   | `/register` | `{ username, password }`      | Register a new user            |
| POST   | `/login`    | `{ username, password }`      | Login; returns `{ token }`     |

Protected routes expect the JWT in the `Authorization` header (see `verifyToken` in `routes/auth.js`).

### Notes (`/notes`)

| Method | Path          | Body / params                    | Description              |
| ------ | ------------- | -------------------------------- | ------------------------ |
| POST   | `/`           | `{ title, content, userId }`     | Create a note            |
| GET    | `/:userId`    | —                                | List notes for a user    |
| PUT    | `/:id`        | `{ title, content }`             | Update a note            |
| DELETE | `/:id`        | —                                | Delete a note            |

## Project structure

```
backend/
├── models/       # Mongoose schemas (User, Note)
├── routes/       # auth.js, notes.js
├── server.js     # App entry point
└── .env          # Local environment (not in git)
```

## Dependencies

- **express** — HTTP server and routing
- **mongoose** — MongoDB ODM
- **bcryptjs** — Password hashing
- **jsonwebtoken** — JWT issuance and verification
- **cors**, **helmet**, **dotenv** — Security and configuration
