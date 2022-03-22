export const getOne = model => async (req, res) => {
  const { id } = req.params
  const { _id: createdBy } = req.user

  const one = await model
    .findOne({
      _id: id,
      createdBy
    })
    .exec()

  if (one) {
    res.status(200).json({ data: one })
  } else {
    res.status(404).end()
  }
}

export const getMany = model => async (req, res) => {
  const { _id: createdBy } = req.user
  const many = await model.find({ createdBy }).exec()

  res.status(200).json({ data: many })
}

export const createOne = model => async (req, res) => {
  const { name } = req.body
  const { _id: createdBy } = req.user
  const one = await model.create({
    name,
    createdBy
  })

  res.status(201).json({ data: one })
}

export const updateOne = model => async (req, res) => {
  const { id } = req.params
  const { _id: createdBy } = req.user
  const { name } = req.body

  const one = await model
    .findOneAndUpdate({ _id: id, createdBy }, { name }, { new: true })
    .exec()

  if (!one) {
    return res.status(404).end()
  }

  res.status(200).json({ data: one })
}

export const removeOne = model => async (req, res) => {
  const { id } = req.params
  const one = await model.findOneAndDelete({ _id: id })

  if (!one) {
    return res.status(404).end()
  }

  res.status(200).json({ data: one })
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
