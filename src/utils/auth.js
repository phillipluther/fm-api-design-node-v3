import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send({ message: 'unauthorized' })
  }

  const user = await User.create(req.body)
  const token = newToken(user)

  return res.status(201).send({ token })
}

export const signin = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send({ message: 'unauthorized' })
  }

  const user = await User.findOne({ email }).exec()

  if (!user) {
    return res.status(401).send({ message: 'unauthorized' })
  }

  try {
    const match = await user.checkPassword(password)

    if (!match) {
      return res.status(401).send({ message: 'not auth' })
    }
  } catch (err) {
    console.log(err)
    return res.status(400).send({ message: 'not auth' })
  }

  const token = newToken(user)
  return res.status(201).send({ token })
}

export const protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send({ message: 'no auth' })
  }

  let token = req.headers.authorization.split('Bearer ')[1]

  if (!token) {
    return res.status(401).send({ message: 'nope' })
  }

  try {
    const payload = await verifyToken(token)
    const user = User.findById({ id: payload.id })
      .select('-password')
      .exec()

    req.user = user
    next()
  } catch (err) {
    console.error(err)
    return res.status(401).send({ message: 'nope' })
  }
}
