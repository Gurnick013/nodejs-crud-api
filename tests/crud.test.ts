import { agent as request } from "supertest";
import { Server } from '../src/Server';
import { IUser } from "../src/Interface/user";
import { testData, testDataForUpdating } from "../src/helpers/testData";

const app = new Server()

describe('Server Crud', function() {
  const response = request(app.server)
  let createUser = ''
  test('GET / get all users', async () => {
    const res = await response.get('/api/users')
        .set('Accept', 'application/json')
    expect(res.status).toEqual(200);
    expect(JSON.parse(res.text)).toEqual([])
  });

  test('POST / create user', async () => {
    const res = await response.post('/api/users')
        .set('Accept', 'application/json')
        .send(testData)
    expect(res.status).toEqual(201);
    const user = JSON.parse(res.text) as IUser
    createUser = user.id
    expect(user.age).toBe(testData.age)
    expect(user.username).toBe(testData.username)
    expect(user.hobbies).toEqual(testData.hobbies)
  })

  test('GET / get user by id', async () => {
    const res = await response.get(`/api/users/${createUser}`)
        .set('Accept', 'application/json')
    expect(res.status).toEqual(200);
    const user = JSON.parse(res.text) as IUser
    expect(user.age).toBe(testData.age)
    expect(user.username).toBe(testData.username)
    expect(user.hobbies).toEqual(testData.hobbies)
  })

  test('PUT / update user', async () => {
    const res = await response.put(`/api/users/${createUser}`)
        .set('Accept', 'application/json')
        .send(testDataForUpdating)
    const user = JSON.parse(res.text) as IUser
    expect(user.age).toBe(testDataForUpdating.age)
    expect(user.username).toBe(testDataForUpdating.username)
    expect(user.hobbies).toEqual(testDataForUpdating.hobbies)
  })

  test('DELETE / remove user', async () => {
    const res = await response.delete(`/api/users/${createUser}`)
        .set('Accept', 'application/json')
    expect(res.status).toEqual(204);
  })
});
