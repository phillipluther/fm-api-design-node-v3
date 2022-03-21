import { Router } from 'express'

const router = Router()

router
  .route('/')
  .get((req, res) => {})
  .post((req, res) => {})

router
  .route('/:id')
  .get((req, res) => {})
  .put((req, res) => {})
  .delete((req, res) => {})

export default router
