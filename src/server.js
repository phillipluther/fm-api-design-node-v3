import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// first exercise

const router = express.Router()
router
  .route('/me')
  .get((req, res) => {
    console.log('>> GET /me')
    res.send(200, 'got you')
  })
  .post((req, res) => {
    console.log('>> POST /me')
    res.send(201, 'posted you')
  })

router
  .route('/me/:id')
  .get((req, res) => {
    res.send(200, `got you ${req.params.id}`)
  })
  .put((req, res) => {
    res.send(200, `updated you ${req.params.id}`)
  })
  .delete((req, res) => {
    res.send(200, `deleted you ${req.params.id}`)
  })

app.use('/api', router)

// simple middleware
const log = (req, res, next) => {
  console.log('>> Custom logging middleware')
  next()
}

app.get('/', (req, res) => {
  res.send({
    message: 'Hello'
  })
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send({
    message: 'ok'
  })
})

app.get('/data', log, (req, res) => {
  res.send(200)
})

app.get('/data/:id', (req, res) => {
  console.log('ID', req.params.id)
  res.send({
    status: 200,
    message: '/data/:id dOK'
  })
})

app.post('/data', (req, res) => {
  res.send(req.body)
})

export const start = () => {
  app.listen(3000, () => {
    console.log('Server is up and listening on :3000')
  })
}
