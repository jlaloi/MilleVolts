/**
 * Dummy mail service
 */
const Opportunity = require('../models/opportunity');

module.exports = {
    sendApplication,
    sendMail
};

/**
 * Send the mail after an application
 * @param application
 */
function sendApplication(application) {
    Opportunity
        .findById(application.opportunity)
        .populate('company')
        .then(opportunity => {
            sendMail(application.mail, opportunity.company.mail, 'Candidature', application.message)
        });
}

/**
 * Sending mail
 * @param sender
 * @param recipient
 * @param subject
 * @param message
 */
function sendMail(sender, recipient, subject, message) {
    console.log(`Mail ${subject} sent to ${recipient} by ${sender}`, message);
}