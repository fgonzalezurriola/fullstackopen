# Tests

Run tests

```sh
npm test
```

# API tests (thunder client)

http://localhost:3003/api/users

POST http://localhost:3003/api/users
Content-Type: application/json

{
"username": "test1",
"name": "test1",
"password": "test1"
}

{
"username": "test2",
"name": "test2",
"password": "test2"
}

http://localhost:3003/api/blogs

POST http://localhost:3003/api/blogs
Content-Type: application/json

{
"title": "Test Blog",
"author": "Test Author",
"url": "http://example.com",
"likes": 0,
"username": "test1"
}

---

## Token test

---

POST
http://localhost:3003/api/users

{
"username": "root",
"name": "Superuser",
"password": "sekret"
}

Expected Response 201 OK

POST http://localhost:3003/api/login
Content-Type: application/json

{
"username": "root",
"password": "sekret"
}

Expected Response 200 OK with body:

{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
"username": "root",
"name": "Superuser"
}

---

POST http://localhost:3003/api/login
Content-Type: application/json

{
"username": "root",
"password": "wrongpassword"
}

Expected Response 401:

{
"error": "invalid username or password"
}

---

POST http://localhost:3003/api/login
Content-Type: application/json

{
"username": "nonexistent",
"password": "anypassword"
}

Expected Response 401:

{
"error": "invalid username or password"
}

---

GET http://localhost:3003/api/blogs

{
"blogs": [],
"username": "root",
"name": "Superuser",
"id": "68d89388dc494b60fe406cea"
}
