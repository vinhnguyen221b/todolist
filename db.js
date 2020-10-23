const Pool = require("pg").Pool;
require("dotenv").config();
// const pool = new Pool({
//   user: "postgres",
//   password: "123456",
//   host: "localhost",
//   database: "mytodolist",
//   port: 5432,
// });

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const proConfig = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? proConfig : devConfig,
});

module.exports = pool;
