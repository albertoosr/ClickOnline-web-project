const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

// inicio de sesion
passport.use('local.login', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contrasena',
    passReqToCallback: true
}, async (req, correo, contrasena, done)=>{
    const rows = await pool.query('SELECT * FROM users WHERE correo = ?', correo);
    if(rows.length > 0) {
        const user = rows [0];
        const validacion = await helpers.descriptacion(contrasena, user.contrasena);
        if(validacion) {
            done(null, user, req.flash('satisfactorio', 'Bienvenid@ ' + user.nombre));
        } else {
            done(null, false, req.flash('error', 'Error de contraseña'))
        }
    } else {
        return done(null, false, req.flash('error', 'El usuario no existe'));
    }

}));


// registro
passport.use('local.registro', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contrasena',
    passReqToCallback: true

}, async (req, correo, contrasena, done)=>{
    const { nombre, dia, mes, ano } = req.body;
    const  descripcion ="";
    let nuevoUsuario = {
        nombre,
        correo,
        descripcion,
        dia,
        mes, 
        ano,
        contrasena, 
    };
    // desiframos
    nuevoUsuario.contrasena = await helpers.encriptacion(contrasena)
    const resultado = await pool.query('INSERT INTO users SET ?', nuevoUsuario);
    nuevoUsuario.id = resultado.insertId;
    return done(null, nuevoUsuario, req.flash('satisfactorio', 'Usuario Registrado'));
}));


// agurdamos el usuario dentro de la sesiòn
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// deseralizar el usuario en la session
passport.deserializeUser( async (id, done)=>{
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});


