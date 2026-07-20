const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'students',
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT) || 5432,
});

module.exports = pool;
