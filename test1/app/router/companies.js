"use strict";

const express = require('express');
const Company = require('../models/company');
const Opportunity = require('../models/opportunity');

const router = express.Router();

router.route('/')

// Get all companies
    .get((req, res, next) => {
        Company.find()
            .then(companies => res.json(companies))
            .catch(next);
    })

    // Create a company
    .post((req, res, next) => {
        new Company(req.body)
            .save()
            .then(company => res.json(company))
            .catch(next);
    });

router.route('/:companyId/opportunities')

// Get company opportunities
    .get((req, res, next) => {
        Opportunity.find({company: req.params.companyId})
            .then(opportunities => res.json(opportunities))
            .catch(next);
    });

module.exports = router;