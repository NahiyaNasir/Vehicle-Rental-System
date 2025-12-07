import config from "../../config";
import { pool } from "../../config/Db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

    const registerUser=async(payload: Record<string, unknown>)=>{
       const { name, email, password, role, phone } = payload;
         console.log(payload,"user");
          const hashedPass = await bcrypt.hash(password as string, 10);
          const result= await pool.query(`INSERT INTO users(name, email, password,role,phone) VALUES($1, $2, $3,$4,$5) RETURNING *`,[name,email,hashedPass,role,phone]);
          console.log(result,"res");
            const user = result.rows[0];
             const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    config.jwtSecret as string,
    {
      expiresIn: "7d",
    }
  );
  // console.log({ token });

  return { token,  user };
 }
// ? login user
   const loginUser = async (email: string, password: string) => {
  console.log({ email });
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email, ])
    console.log({ result });

 if (result.rows.length === 0) {
    return null;
  }
  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password);

  console.log({ match, user });
  if (!match) {
    return false;
  }

  const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    config.jwtSecret as string,
    {
      expiresIn: "7d",
    }
  );
  console.log({ token });
console.log("SIGN SECRET:", config.jwtSecret);

  return { token, user };
  
  ;}

  export const authServices = {
  loginUser,
  registerUser
};
