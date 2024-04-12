import express from 'express'

export const app = express()
app.use(express.json())

const items = [{
  id: 1,
  content: 'Item 1'
}]

// EJERCICO 6 aquí

// getAllTasks
app.get('/items', (req, res) => {
  return res.json(items)
})

// addTask
app.post('/items', (req, res) => {
  const { content } = req.body
  const item = {
    id: 2,
    content
  }
  items.push(item)
  return res.json(item)
})

// getTaskById
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const [response] = items.filter((item) => item.id === id)
  return res.json(response)
})

// deleteTaskById
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id)
  items.splice(items.indexOf(item => item.id === id), 1)
  return res.json({})
})

export const server = app.listen(3000)
