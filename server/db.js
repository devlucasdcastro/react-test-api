const Pool = require("pg").Pool;


//dbconfig
const pool = new Pool({
    user: "postgres",
    password:"74159635",
    host: "localhost",
    port: "5432",
    database:"challenge-db"
});

module.exports = pool;