const express = require('express');
const db = require('./db');

const router = express.Router();

// Create a new contact
router.post('/contacts', async (req, res) => {
  // ... (same code as before)
});

// Delete a contact
router.delete('/contacts/:id', async (req, res) => {
  const contactId = req.params.id;

  try {
    await db.query('DELETE FROM contacts WHERE id = ?', [contactId]);
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Error deleting contact' });
  }
});

// Fetch all contacts
router.get('/contacts', async (req, res) => {
  try {
    const [contacts] = await db.query('SELECT * FROM contacts');
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Error fetching contacts' });
  }
});

// Search contacts
router.get('/contacts/search', async (req, res) => {
  const query = req.query.q;

  try {
    const [contacts] = await db.query('SELECT * FROM contacts WHERE name LIKE ? OR id IN (SELECT contact_id FROM phone_numbers WHERE phone_number = ?)', [`%${query}%`, query]);
    res.json(contacts);
  } catch (error) {
    console.error('Error searching contacts:', error);
    res.status(500).json({ error: 'Error searching contacts' });
  }
});

// Update a contact
router.put('/contacts/:id', async (req, res) => {
  const contactId = req.params.id;
  const { name, phoneNumbers, imageUrl } = req.body;

  try {
    await db.query('UPDATE contacts SET name = ? WHERE id = ?', [name, contactId]);

    await db.query('DELETE FROM phone_numbers WHERE contact_id = ?', [contactId]);
    const phoneNumberPromises = phoneNumbers.map(async (phoneNumber) => {
      await db.query('INSERT INTO phone_numbers (contact_id, phone_number) VALUES (?, ?)', [contactId, phoneNumber]);
    });
    await Promise.all(phoneNumberPromises);

    if (imageUrl) {
      await db.query('UPDATE images SET image_url = ? WHERE contact_id = ?', [imageUrl, contactId]);
    }

    res.json({ message: 'Contact updated successfully' });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Error updating contact' });
  }
});

module.exports = router;
