const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

async function seed() {
  // First connect without database to create it
  let connection;
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
    });

    console.log('Connected to MySQL server.');

    // Execute init.sql
    const sqlPath = path.join(__dirname, '..', 'init.sql');
    const sqlStatements = fs.readFileSync(sqlPath, 'utf8')
      .split(';')
      .filter((stmt) => stmt.trim().length > 0);

    for (let stmt of sqlStatements) {
      await connection.query(stmt);
    }
    console.log('Database and tables initialized.');

    // Switch to kp_pmi database
    await connection.query('USE kp_pmi');

    // Create default admin user
    const [users] = await connection.query('SELECT * FROM users WHERE username = ?', ['admin']);
    if (users.length === 0) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const uuid = crypto.randomUUID();
      await connection.query(
        'INSERT INTO users (id, username, password) VALUES (?, ?, ?)',
        [uuid, 'admin', hashedPassword]
      );
      console.log('Default admin user created (username: admin, password: password123)');
    } else {
      console.log('Admin user already exists.');
    }

    // Insert default blood stock if empty
    const [stocks] = await connection.query('SELECT * FROM blood_stocks');
    if (stocks.length === 0) {
      await connection.query(`
        INSERT INTO blood_stocks (product_type, a_pos, a_neg, b_pos, b_neg, o_pos, o_neg, ab_pos, ab_neg) VALUES 
        ('WB (Whole Blood)', 12, 0, 25, 0, 18, 0, 5, 0),
        ('PRC (Packed Red Cell)', 8, 0, 15, 0, 22, 0, 3, 0),
        ('TC (Thrombocyte)', 5, 0, 10, 0, 12, 0, 2, 0)
      `);
      console.log('Default blood stocks inserted.');
    } else {
      console.log('Blood stocks already exist.');
    }

  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    if (connection) await connection.end();
  }
}

seed();
