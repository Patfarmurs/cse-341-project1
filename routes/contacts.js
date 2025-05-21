//console.log("contacts.js is loading...");
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDatabase } = require('./data/database.js');


/**
 * @swagger
 * /contacts:
 *   get:
 *     description: Get all contacts
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', async (req, res) => {
    try {
        const db = getDatabase();
        const contacts = await db.collection('Contacts').find().toArray();
        res.json(contacts);
    } catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req, res) => {
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




/**
 * @swagger
 * /contacts:
 *   post:
 *     description: Create a new contact
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Contact created
 */
router.post('/', async (req, res) => {
    try {
        const db = getDatabase();
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).send('All fields are required.');
        }

        const result = await db.collection('Contacts').insertOne({
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        });

        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        console.error('Error creating contact:', err);
        res.status(500).send('Server Error');
    }
});


router.put('/:id', async (req, res) => {
    try {
        const db = getDatabase();
        const contactId = new ObjectId(req.params.id);
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).send('All fields are required.');
        }

        const result = await db.collection('Contacts').updateOne(
            {_id: contactId},
            {
                $set: {
                    firstName,
                    lastName,
                    email,
                    favoriteColor,
                    birthday
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).send('Contact not found.');
        }

        res.status(204).send();
    } catch (err) {
        console.error('Error updating contact:', err);
        res.status(500).send('Server Error');
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const db = getDatabase();

        const contactId = new ObjectId(req.params.id);

        const result = await db.collection('Contacts').deleteOne({ _id: contactId });

        if (result.deletedCount === 0) {
            return res.status(404).send('Contact not found.');
        }

        res.status(200).send('Contact deleted.');
    } catch (err) {
        console.error('Error deleting contact:', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;