const db = require('./db');

async function createTables() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS phone_numbers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        contact_id INT,
        phone_number VARCHAR(20) NOT NULL,
        FOREIGN KEY (contact_id) REFERENCES contacts(id)
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        contact_id INT,
        image_url VARCHAR(255),
        FOREIGN KEY (contact_id) REFERENCES contacts(id)
      )
    `);

    console.log('Tables created');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    db.end();
  }
}

createTables();
