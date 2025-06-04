router.post('/login', async (req, res) => {
    const user = await db.User.findOne({ where: { email: req.body.email } });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        req.session.user = user;
        res.redirect('/');
    } else {
        res.render('login', { error: 'Credenciales incorrectas' });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/'); // Redirige a la página de inicio
    });
});

module.exports = router;