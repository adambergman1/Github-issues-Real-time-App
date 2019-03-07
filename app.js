const express = require('express')
const path = require('path')
const hbs = require('express-hbs')

const app = express()
const port = 3000

const server = require('http').createServer(app)
const io = require('socket.io')(server)
io.on('connection', socket => {
  socket.on('issues', data => {
    console.log(data)
  })
})
server.listen(port, () => console.log(`Server running on http://localhost:${port}/`))

// app.listen(port, () => console.log(`Server running on http://localhost:${port}/`))

// view engine setup
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// Routes
app.use('/', require('./routes/homeRouter'))

// additional middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// catch 404
app.use((req, res, next) => {
  res.status(404)
  res.sendFile(path.join(__dirname, 'public', '404.html'))
})

// error handler
app.use((err, req, res, next) => {
  if (err.message === '403') {
    res.status(err.status || '403')
    res.sendFile(path.join(__dirname, 'public', '403.html'))
  } else if (err.status === '500') {
    res.status(err.status || 500)
    res.send(err.message || 'Internal Server Error')
  }
})
