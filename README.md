# CRUD API

Clone the repository: https://github.com/Gurnick013/nodejs-crud-api

Install

```
npm install
```

Start project

```
npm run start:dev
npm run start:multi
npm run start:prod
```

Go to https://www.postman.com/ and send requests:

**Get all users**: GET http://127.0.0.1:4000/api/users

**Get user by id**: GET http://127.0.0.1:4000/api/users/${id}

**Create new user**: POST http://127.0.0.1:4000/api/users + body
```
{
    "username": string,
    "age": number,
    "hobbies": string[]
}
```
**Update user**: PUT http://127.0.0.1:4000/api/users/${id} + body

```
{
    "username": string,
    "age": number,
    "hobbies": string[]
}
```
**Delete user** -> DELETE http://127.0.0.1:4000/api/users/${id}

## Unit tests

Run tests

```
npm run test
```
