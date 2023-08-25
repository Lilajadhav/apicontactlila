const assert = require('assert');
const request = require('supertest');
const app = require('../app'); // Adjust the path as per your project structure

describe('Contact API Tests', () => {
  it('should create a new contact', (done) => {
    const newContact = {
      name: 'John Doe',
      phoneNumbers: ['1234567890', '9876543210'],
      imageUrl: 'http://example.com/image.jpg',
    };

    request(app)
      .post('/contacts')
      .send(newContact)
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.equal(res.body.message, 'Contact created successfully');
        done();
      });
  });

  it('should fetch all contacts', (done) => {
    request(app)
      .get('/contacts')
      .end((err, res) => {
        assert.equal(res.status, 200);
        // Assert other conditions based on your API response
        done();
      });
  });

  it('should delete a contact', (done) => {
    // Make sure to replace ':contactId' with an actual contact ID
    const contactIdToDelete = 123; // Replace with a valid contact ID

    request(app)
      .delete(`/contacts/${contactIdToDelete}`)
      .end((err, res) => {
        assert.equal(res.status, 200);
        // Assert other conditions based on your API response
        done();
      });
  });

  it('should search contacts', (done) => {
    const searchTerm = 'John'; // Replace with a valid search term

    request(app)
      .get(`/contacts/search?term=${searchTerm}`)
      .end((err, res) => {
        assert.equal(res.status, 200);
        // Assert other conditions based on your API response
        done();
      });
  });

  it('should update a contact', (done) => {
    // Make sure to replace ':contactId' with an actual contact ID
    const contactIdToUpdate = 123; // Replace with a valid contact ID
    const updatedContact = {
      name: 'Updated Name',
      phoneNumbers: ['1111111111'],
      imageUrl: 'http://example.com/updated-image.jpg',
    };

    request(app)
      .put(`/contacts/${contactIdToUpdate}`)
      .send(updatedContact)
      .end((err, res) => {
        assert.equal(res.status, 200);
        // Assert other conditions based on your API response
        done();
      });
  });


  // Add more test cases for other functionalities
});
