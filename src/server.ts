import config from "./config";
import express  from "express";
import { userRoute } from "./modules/user/userRoute";
import { authRoutes } from "./modules/auth/authRoute";

const port = config.port;
const app = express();
// parser
app.use(express.json());
app.use("/api/v1/user",userRoute)
app.use("/api/v1/auth",authRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});