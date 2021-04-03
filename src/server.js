//Globales
const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')

const path = require('path')

//Mensajes de error
const flash = require('connect-flash')
//sessiones
const session = require('express-session')
const MySQlStore = require('express-mysql-session')
const { database } = require('./keys');
// passport autentificacion
const passport = require('passport');


//config server 
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

//Inicialización
require('./lib/passport')

//Template html
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),

    extname: '.hbs',

    helpers: require('./lib/handlebars')
}))
// Ocupación de handlerbar
app.set('view engine', '.hbs')

//middlewares peticiones al server
app.use(session({
    secret: 'clickOnline',
    resave: false,
    saveUninitialized: false,
    store: new MySQlStore(database)
}));
app.use(flash());
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());


// variables globales
app.use((req, res, next)=>{
    app.locals.satisfactorio = req.flash('satisfactorio');
    app.locals.error = req.flash('error');
    // variable de usuario global
    app.locals.usuario = req.user;
    next();
});

//Routers
app.use(require('./router/index'))
app.use(require('./router/autentificacion'))
app.use('/user', require('./router/usuario'))
app.use(require('./router/stream'))

//Directorio public
app.use(express.static(path.join(__dirname, 'public')))

// socket.io
io.on('connection', socket => {
    console.log('Socket conexion ID: ' + socket.id)
    socket.on('join-room', (roomId, userId) => {
        console.log('join room: ' + roomId)
        console.log('join user: ' + userId)
    
        socket.join(roomId)
        socket.to(roomId).emit('user-connected', userId)

        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', userId)
        })

        socket.on('chat:message', (data) => {
            io.sockets.emit('chat:message', data);
        })

        socket.on('chat:typing', (data) => {
            socket.broadcast.emit('chat:typing', data);
        })
    })
})


//Servidor
server.listen(4000, () => {
    console.log('Server success port: 4000')
})