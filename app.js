const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
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

const server = require('http').createServer(app)
server.listen(port, () => console.log(`Server running on http://localhost:${port}/`))

// middleware
app.use(bodyParser.raw({ type: 'application/json' }))
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/homeRouter'))
app.use('/webhook', require('./routes/webhook'))

// Set socket.io listeners
const io = require('socket.io')(server)

io.on('connection', async socket => {
  console.log('Opened a websocket connection')
  return io
  // const fetchGithub = require('./src/js/fetch')
  // let issues = await fetchGithub('https://api.github.com/repos/1dv023/ab224qr-examination-3/issues')
  // io.emit('issue', { issues: issues })
})
app.set('socketio', io)

// view engine setup
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// catch 404
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'))
})

// error handler
app.use((err, req, res, next) => {
  if (err.message === '403') {
    res.status(err.status || '403').sendFile(path.join(__dirname, 'public', '403.html'))
  } else if (err.status === '500') {
    res.status(err.status || 500).send(err.message || 'Internal Server Error')
  }
})
