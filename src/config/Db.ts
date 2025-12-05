import config from ".";
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});
//  console.log(config.connection_str);
const initDB = async () => {
  await pool.query(`
   CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE ,
        password  VARCHAR(100) NOT NULL  CHECK (LENGTH(password) >= 6),
        role VARCHAR(50) CHECK (role IN ('admin', 'customer')),
       phone VARCHAR(15) NOT NULL ,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
  `);
};
export default      initDB();
