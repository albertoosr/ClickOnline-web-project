const express = require('express')
const router = express.Router()
const { v4: uuidV4 } = require('uuid')

const pool = require('../database');
const { isLoggedIn } = require('../lib/session')

// redirect
router.get('/roomstream', (req, res) => {
    res.redirect(`/user/roomstream/${uuidV4()}`)
})

// render
router.get('/index',isLoggedIn, (req, res) => {
    res.render('usuario/index')
})

router.get('/live',isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM  streaming WHERE status =  0');
    console.log(links);
    res.render('usuario/live', { links });
})

router.get('/stream',isLoggedIn, async (req, res) => {
    const stream = await pool.query('SELECT * FROM streaming WHERE user_id = ?', [req.user.id]);
    res.render('usuario/streaming', {stream})
})

router.get('/perfil',isLoggedIn, (req, res) => {
    res.render('usuario/perfil')
})

router.get('/roomstream/:room',isLoggedIn, (req, res) => {
    res.render('usuario/roomstream', { roomId: req.params.room })
})

router.get('/viewstream/:room', isLoggedIn, (req, res) => {
    res.render('usuario/viewstream', { roomId: req.params.room })
})

router.post('/edit', async (req, res) => {
    const {nombre, correo, descripcion}  = req.body;
    const updateUser = {
        nombre,
        correo,
        descripcion
    };
    await pool.query('UPDATE users set ? WHERE id = ?', [updateUser, req.user.id ]);
    req.flash('satisfactorio', 'Tus datos han sido actulizados');
    res.render('usuario/index')
   
})

router.get('/delete', async (req, res) => {
    await pool.query('DELETE FROM users WHERE id = ?', [req.user.id]);
    req.flash('satisfactorio', 'Usuario eliminado');
    req.logOut();
    res.redirect('/');
})

module.exports = router