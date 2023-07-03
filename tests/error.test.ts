import { agent as request } from "supertest";
import { Server } from '../src/Server';
import { IUser } from '../src/Interface/user';
import { MessageErr } from '../src/helpers/errorMessages';

const app = new Server()

describe('Server Error', () => {
  const response = request(app.server)
  test('GET / invalid user id', async () => {
    const res = await response.get('/api/users/gg')
        .set('Accept', 'application/json')
    expect(res.status).toEqual(400);
    expect(JSON.parse(res.text)).toEqual(MessageErr.isNotValidID('gg'))
  })

  test('GET / not found user id', async () => {
    const res = await response.get('/api/users/66fa2f02-6c25-4a6a-80db-791aeff152f0')
        .set('Accept', 'application/json')
    expect(res.status).toEqual(404);
    expect(JSON.parse(res.text)).toEqual(MessageErr.isNotUserID('66fa2f02-6c25-4a6a-80db-791aeff152f0'))
  })

  test('POST / no valid fields', async () => {
    const res = await response.post('/api/users')
        .send({ username: 'Bill' })
    expect(res.status).toEqual(400)
    expect((JSON.parse(res.text) as { errors: Array<IUser> }).errors.length).toBe(2)
  })

  test('POST / empty body', async () => {
    const res = await response.post('/api/users')
    expect(res.status).toEqual(400)
    expect(JSON.parse(res.text)).toEqual(MessageErr.failed('create'))
  })

  test('PUT / no valid id', async () => {
    const res = await response.put('/api/users/0x041cxa123456')
    expect(res.status).toEqual(400);
    expect(JSON.parse(res.text)).toEqual(MessageErr.isNotValidID('0x041cxa123456'))
  })

  test('PUT / not found user id', async () => {
    const res = await response.put('/api/users/66fa2f02-6c25-4a6a-80db-791aeff152f0')
    expect(res.status).toEqual(404);
    expect(JSON.parse(res.text)).toEqual(MessageErr.isNotUserID('66fa2f02-6c25-4a6a-80db-791aeff152f0'))
  })

  test('PUT / no id', async () => {
    const res = await response.put('/api/users')
    expect(res.status).toEqual(404);
    expect(JSON.parse(res.text)).toEqual(MessageErr.notID)
  })
})
