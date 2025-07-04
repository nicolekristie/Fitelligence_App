# Fitelligence API Documentation

## Authentication Endpoints

### Register User

- **POST** `/api/register`
- **Body**: `{ firstname, lastname, username, email, password }`
- **Response**: Success message

### Login User

- **POST** `/api/login`
- **Body**: `{ email, password }`
- **Response**: `{ message, token, user }`
- **Token**: JWT valid for 24 hours

## Protected Endpoints (Require JWT)

### Get User Profile

- **GET** `/api/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ message, user }`

### Update User Profile

- **PUT** `/api/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ firstname, lastname, username }`
- **Response**: `{ message, user }`

## JWT Authentication

### How to use JWT tokens:

1. Login with email/password to get token
2. Include token in Authorization header: `Bearer <token>`
3. Token expires in 24 hours
4. Protected routes will verify token automatically

### Example Usage:

```bash
# 1. Register
curl -X POST http://localhost:3001/api/register \\
  -H "Content-Type: application/json" \\
  -d '{"firstname":"John","lastname":"Doe","username":"johndoe","email":"john@example.com","password":"password123"}'

# 2. Login (get token)
curl -X POST http://localhost:3001/api/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"john@example.com","password":"password123"}'

# 3. Use token for protected routes
curl -X GET http://localhost:3001/api/profile \\
  -H "Authorization: Bearer <your_token_here>"
```

## Error Handling

- **400**: Bad request (missing fields, validation errors)
- **401**: Unauthorized (invalid credentials, missing token)
- **403**: Forbidden (invalid token)
- **404**: Not found (user not found)
- **500**: Internal server error
