import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'kp_pmi',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Singleton pattern to prevent creating multiple pools during development hot-reloads
let pool: mysql.Pool;

if (process.env.NODE_ENV === 'production') {
  pool = mysql.createPool(dbConfig);
} else {
  if (!(global as any).mysqlPool) {
    (global as any).mysqlPool = mysql.createPool(dbConfig);
  }
  pool = (global as any).mysqlPool;
}

export default pool;
