"use strict";

const express = require('express');
const Application = require('../models/application');
const MailService = require('../misc/mailService');

const router = express.Router();

router.route('/')

// Get all applications
    .get((req, res, next) => {
        Application.find()
            .then(applications => res.json(applications))
            .catch(next);
    })

    // Create a new application
    .post((req, res, next) => {
        new Application(req.body)
            .save()
            .then(application => {
                MailService.sendApplication(application);
                return application;
            })
            .then(application => res.json(application))
            .catch(next);
    });

module.exports = router;