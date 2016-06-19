"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OpportunitySchema = new Schema({
    title: String,
    description: String,
    company: {type: mongoose.Schema.Types.ObjectId, index: true, ref: 'Company'},
    region: {type: String, index: true},
    city: String,
    contractType: {type: String, index: true}
}, {timestamps: true});

/**
 * As a search can be performed on opportunity title and description create a specific "text" index
 */
OpportunitySchema.index(
    {
        title: "text",
        description: "text"
    },
    {
        name: "opportunityTextIndex",
        weights: {
            title: 10,
            description: 5
        }
    }
);

module.exports = mongoose.model('Opportunity', OpportunitySchema);