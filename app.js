const express = require('express')
const path = require('path')
const hbs = require('express-hbs')
const helmet = require('helmet')

const app = express()
const port = 3000

app.use(helmet())

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
    scriptSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com', 'api.github.com', 'developer.github.com', 'use.fontawesome.com', 'cdn.socket.io'],
    upgradeInsecureRequests: true,
    workerSrc: false // This is not set.
  }
}))

app.set('etag', 'strong')

const server = require('http').createServer(app)
server.listen(port, () => console.log(`Server running on http://localhost:${port}/`))

// additional middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

const io = require('socket.io')(server)
const fetchGitHub = require('./src/js/fetch')

// Set socket.io listeners.
io.on('connection', async socket => {
  try {
    let result = await fetchGitHub('https://api.github.com/repos/1dv023/ab224qr-examination-3/issues')
    io.emit('issue', { issues: result })
  } catch (err) {
    console.log(err)
  }
})

app.post('/webhook', (req, res, next) => {
  let parsedBody = JSON.parse(req.body)
  let body = req.body

  console.log('headers', req.headers)
  console.log('body', body)

  res.sendStatus(200)
})

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
