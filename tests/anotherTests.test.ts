import request from 'supertest';
import { Server } from '../src/Server';
import { IUser } from '../src/Interface/user';
import { newTestData, testDataOne, testDataTwo } from "../src/helpers/testData";

const app = new Server()

describe('Server Crud', function() {
  const response = request(app.server)
  let userID = ''
  let user2ID = ''

  it('POST / create user', async () => {
    const res1 = await response.post('/api/users')
        .set('Accept', 'application/json')
        .send(testDataOne)
    expect(res1.status).toEqual(201);
    const user1 = JSON.parse(res1.text) as IUser
    userID = user1.id
    expect(user1.age).toBe(testDataOne.age)
    expect(user1.username).toBe(testDataOne.username)
    expect(user1.hobbies).toEqual(testDataOne.hobbies)

    const res2 = await response.post('/api/users')
        .set('Accept', 'application/json')
        .send(testDataTwo)
    expect(res2.status).toEqual(201);
    const user2 = JSON.parse(res2.text) as IUser
    user2ID = user2.id
    expect(user2.age).toBe(testDataTwo.age)
    expect(user2.username).toBe(testDataTwo.username)
    expect(user2.hobbies).toEqual(testDataTwo.hobbies)
    testDataOne.id = userID
    testDataTwo.id = user2ID
  })

  it('GET / get all users', async () => {
    const res = await response.get('/api/users')
        .set('Accept', 'application/json')
    expect(res.status).toEqual(200);
    expect(JSON.parse(res.text)).toEqual([testDataOne, testDataTwo])
  });

  it('PUT / update user', async () => {
    const res = await response.put(`/api/users/${userID}`)
        .set('Accept', 'application/json')
        .send(newTestData)
    const user = JSON.parse(res.text) as IUser
    expect(user.age).toBe(newTestData.age)
    expect(user.username).toBe(newTestData.username)
    expect(user.hobbies).toEqual(newTestData.hobbies)
  })

  it('GET / get user by id', async  () => {
    const res = await response.get(`/api/users/${userID}`)
    const user = JSON.parse(res.text) as IUser
    expect(user.age).toBe(newTestData.age)
    expect(user.username).toBe(newTestData.username)
    expect(user.hobbies).toEqual(newTestData.hobbies)
  })

  it('DELETE / remove user', async () => {
    const res = await response.delete(`/api/users/${userID}`)
        .set('Accept', 'application/json')
    expect(res.status).toEqual(204);
  })
});
