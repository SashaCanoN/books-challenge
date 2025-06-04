const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database/models');

router.post('/users/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await db.User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.render('login', { error: 'Credenciales incorrectas' });
    }

    req.session.user = {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin // Guarda si el usuario es administrador
    };

    res.redirect('/');
});

module.exports = router;