const { Pool } = require("pg");

// PostgreSQL connection setup
const pool = new Pool({
    user: "#",   // Replace with your PostgreSQL username
    host: "#",          // Database host
    database: "#",      // Replace with your database name
    password: "#", // Replace with your PostgreSQL password
    port: 5432,                 // Default PostgreSQL port
    ssl: {
      rejectUnauthorized: false
    }
  });
console.log(pool)
// Check database connection
pool.connect((err, client, release) => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
    } else {
      console.log("Database connected successfully!");
    }
    release(); // Release the client back to the pool
  });

  export default pool