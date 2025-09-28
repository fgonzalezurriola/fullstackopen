Run tests

```sh
npm test
```

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
