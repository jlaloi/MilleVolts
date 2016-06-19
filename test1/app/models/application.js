"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    firstName: String,
    lastName: String,
    mail: String,
    message: String,
    opportunity: {type: mongoose.Schema.Types.ObjectId, index: true, ref: 'Opportunity'}
}, {timestamps: true});

module.exports = mongoose.model('Application', ApplicationSchema);