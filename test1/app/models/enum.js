"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnumSchema = new Schema({
    type: String,
    value: String
});

module.exports = mongoose.model('Enum', EnumSchema);