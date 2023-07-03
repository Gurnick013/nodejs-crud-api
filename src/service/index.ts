import { v4, validate } from "uuid";
import { checkCreate, checkUpdate } from "../helpers/requestCheking";
import { HttpCode, ReqType, ResType } from "../helpers/statusCodes";
import { IUser } from "../Interface/user";
import { MessageErr } from "../helpers/errorMessages";

export class UserService {
  getUserById(req: ReqType, res: ResType, id: string, db: IUser[]) {
    try {
      if (id) {
        const [user] = db.filter(el => el.id === id)
        if (validate(id)) {
          if (user) {
            res.send(HttpCode.Success, user)
          } else {
            res.send(HttpCode.NotFound, MessageErr.isNotUserID(id))
          }
        } else {
          res.send(HttpCode.BadReq, MessageErr.isNotValidID(id))
        }
      } else {
        res.send(HttpCode.Success, db)
      }
    } catch(e) {
      res.send(HttpCode.ErrorServer, "Server Error")
    }
  }

  createUser(req: ReqType, res: ResType, parameter: string, db: IUser[], send: (db: IUser[]) => void) {
    try {
      if (parameter) {
        res.send(HttpCode.NotFound, MessageErr.notFound)
        return
      } else {
        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', () => {
          try {
            const user = JSON.parse(body)
            const errors = checkCreate(user)
            if (errors.length === 0) {
              const id = v4()
              db.push({ id, username: user.username, age: user.age, hobbies: user.hobbies })
              send(db)
              res.send(HttpCode.Created, { id, ...user })
            } else {
              res.send(HttpCode.BadReq, { errors })
            }
          } catch(e) {
            res.send(HttpCode.BadReq, MessageErr.failed('create'))
          }
        })
      }
    } catch (e) {
      res.send(HttpCode.ErrorServer, "Server Error")
    }
  }

  updateUser(req: ReqType, res: ResType, parameter: string, db: IUser[], send: (db: IUser[]) => void) {
    try {
      const index = db.findIndex(el => el.id === parameter)
      if (!parameter) {
        res.send(HttpCode.NotFound, MessageErr.notID)
        return
      } else if (!validate(parameter)) {
        res.send(HttpCode.BadReq, MessageErr.isNotValidID(parameter))
        return
      } else if (index === -1) {
        res.send(HttpCode.NotFound, MessageErr.isNotUserID(parameter))
        return
      } else {
        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', () => {
          try {
            const user = JSON.parse(body)
            const errors = checkUpdate(user)
            if (errors.length === 0) {
              const prevItem = db[index]
              const userItem = {
                id: prevItem.id,
                username: user.username ? user.username : prevItem.username,
                age: user.age ? user.age : prevItem.age,
                hobbies: user.hobbies ? user.hobbies : prevItem.hobbies,
              }
              db.splice(index, 1, userItem)
              send(db)
              res.send(HttpCode.Success, userItem)
            } else {
              res.send(HttpCode.BadReq, { errors })
            }
          } catch(e) {
            res.send(HttpCode.BadReq, MessageErr.failed('update'))
          }
        })
      }
    } catch (e) {
      res.send(HttpCode.ErrorServer, "Server Error")
    }
  }

  removeUser(req: ReqType, res: ResType, parameter: string, db: IUser[], send: (db: IUser[]) => void) {
    try {
      const userI = db.findIndex(el => el.id === parameter)
      if (!parameter) {
        res.send(HttpCode.BadReq, MessageErr.notID)
        return
      } else if (!validate(parameter)) {
        res.send(HttpCode.BadReq, MessageErr.isNotValidID(parameter))
        return
      } else if (userI === -1) {
        res.send(HttpCode.NotFound, MessageErr.isNotUserID(parameter))
        return
      }
      db.splice(userI, 1)
      send(db)
      res.send(HttpCode.Delete, null)
    } catch (e) {
      res.send(HttpCode.ErrorServer, "Server Error")
    }
  }
}
