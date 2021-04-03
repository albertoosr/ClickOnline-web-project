const express = require('express')
const router = express.Router()

const pool = require('../database')

router.post('/publicstream', async (req, res) => {
    const {titulo, nombre, url, descripcion}  = req.body;
    const status = 0;
    const nuevoLink = {
        titulo,
        nombre,
        url,
        descripcion,
        status,
        user_id: req.user.id
     
    };

    await pool.query('INSERT INTO streaming set ?', [nuevoLink]);
    req.flash('satisfactorio', 'Streaming registrado exitosamente');
    // res.redirect('/user/roomstream');  
})

router.get('/delete', async (req, res) => {
    await pool.query('DELETE FROM streaming WHERE user_id = ?', [req.user.id]);
    req.flash('satisfactorio', 'Finalizaste el streaming con exito');
    res.render('usuario/index');
})

router.get('/streamdelete/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM streaming WHERE user_id = ? AND  id = ?', [req.user.id, id]);
    req.flash('satisfactorio', 'Streaming eliminado');
    res.render('usuario/index');
})

module.exports = router