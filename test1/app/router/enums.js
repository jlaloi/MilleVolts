"use strict";

const express = require('express');

const router = express.Router();
const Enum = require('../models/enum');

router.route('/')

// Get all enums
    .get((req, res, next) => {
        Enum.find()
            .then(applications => res.json(applications))
            .catch(next);
    });

module.exports = router;