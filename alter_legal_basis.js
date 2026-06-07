const mysql = require('mysql2/promise');

async function main() {
  const db = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kp_pmi'
  });

  try {
    console.log("Altering legal_basis table...");
    await db.query(`
      ALTER TABLE legal_basis 
      ADD COLUMN document_number VARCHAR(100) AFTER title,
      ADD COLUMN year VARCHAR(20) AFTER document_number,
      ADD COLUMN file_url VARCHAR(255) AFTER description;
    `);
    console.log("Success!");
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log("Columns already exist.");
    } else {
      console.error(err);
    }
  } finally {
    process.exit(0);
  }
}

main();
