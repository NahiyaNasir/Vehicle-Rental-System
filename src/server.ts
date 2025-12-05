import config from "./config";
import express, { Request, Response }  from "express";
import { userRoute } from "./modules/user/userRoute";
import { authRoutes } from "./modules/auth/authRoute";
import { vehicleRoute } from "./modules/Vehicle/vehicleRoute";

const port = config.port;
const app = express();
// parser
app.use(express.json());

app.get("/",  (req: Request, res: Response) => {
  res.send("Hello Next Level Developers!");
});
// user
app.use("/api/v1/user",userRoute)
// login register
app.use("/api/v1/auth",authRoutes)
// vehicle
app.use("/api/v1/vehicles",vehicleRoute)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});