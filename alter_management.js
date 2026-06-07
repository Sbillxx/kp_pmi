const mysql = require('mysql2/promise');

async function main() {
  const db = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kp_pmi'
  });

  try {
    console.log("Altering management table...");
    await db.query(`
      ALTER TABLE management 
      ADD COLUMN title VARCHAR(255) DEFAULT NULL AFTER id,
      ADD COLUMN description TEXT DEFAULT NULL AFTER image_url,
      ADD COLUMN document_url VARCHAR(255) DEFAULT NULL AFTER description,
      ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER document_url,
      MODIFY COLUMN name VARCHAR(255) NULL,
      MODIFY COLUMN position VARCHAR(255) NULL;
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
