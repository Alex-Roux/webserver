const express = require('express');
const router = express.router();


// Root page
router.get('/', (req,res) => {
    res.render('/index');
});