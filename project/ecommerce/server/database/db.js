import pkg from "pg";
const { Client } = pkg;

const database = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

try {
  await database.connect();
  console.log("Connected to Database Successfully");
} catch (error) {
  console.error("Database Connection failed:", error);
  process.exit(1);
}

export default database;
