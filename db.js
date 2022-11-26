const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "181.56.85.22",
    database: "VassAgency",
    password: "celulac",
    port: "5432"
});

module.exports = pool;