import mysql from 'mysql2/promise';

// Load environment variables from .env file


// MySQL connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'etherealBeauty',
};

// Create a function to get the database connection
const getDbConnection = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to the database');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

export { getDbConnection };