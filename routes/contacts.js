//console.log("contacts.js is loading...");
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDatabase } = require('./data/database.js');


router.get('/contacts', async (req, res) => {
    try {
        const db = getDatabase();
        const contacts = await db.collection('Contacts').find().toArray();
        res.json(contacts);
    } catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).send('Server Error');
    }
});

router.get('/contacts/:id', async (req, res) => {
    try {
        const db = getDatabase();
        const contact = await db.collection('Contacts').findOne({ _id: new ObjectId(req.params.id) });

        if (!contact) {
            return res.status(404).send('Contact not found');
        }

        res.json(contact);
    } catch (err) {
        console.error('Error fetching contact:', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;