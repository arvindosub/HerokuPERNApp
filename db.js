const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
    
};

const prodConfig = process.env.DATABASE_URL; //heroku addons

const pool = new Pool({
    connectionString: process.env.NODE_ENV === "production" ? prodConfig : devConfig,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;