"use strict";

const express = require('express');
const Opportunity = require('../models/opportunity');
const Application = require('../models/application');

const router = express.Router();

router.route('/')

// Get all opportunities
    .get((req, res, next) => {
        Opportunity.find()
            .populate('company')
            .then(opportunities => res.json(opportunities))
            .catch(next);
    })

    // Create a new opportunity
    .post((req, res, next) => {
        new Opportunity(req.body)
            .save()
            .then(opportunity => res.json(opportunity))
            .catch(next);
    });

router.route('/search')

// Search opportunity (text / description => query; region; contractType}
// http://stackoverflow.com/questions/24714166/full-text-search-with-weight-in-mongoose
    .get((req, res, next) => {
        const {query, region, contractType} = req.query;
        const request = {};
        if (query)
            request.$text = {$search: query};
        if (region)
            request.region = region;
        if (contractType)
            request.contractType = contractType;
        Opportunity.find(request, {score: {$meta: "textScore"}})
            .populate('company')
            .sort({score: {$meta: 'textScore'}})
            .exec()
            .then(opportunities => res.json(opportunities))
            .catch(next);
    });

router.route('/:opportunityId')

// Get an opportunity
    .get((req, res, next) => {
        Opportunity.findById(req.params.opportunityId)
            .populate('company')
            .then(user => res.json(user))
            .catch(next);
    });

router.route('/:opportunityId/applications')

// Get opportunity applications
    .get((req, res, next) => {
        Application.find({opportunity: req.params.opportunityId})
            .then(applications => res.json(applications))
            .catch(next);
    });

module.exports = router;