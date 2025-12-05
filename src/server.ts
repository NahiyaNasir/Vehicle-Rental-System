import config from "./config";
import express  from "express";
import { userRoute } from "./modules/user/userRoute";
import { authRoutes } from "./modules/auth/authRoute";
import { vehicleRoute } from "./modules/Vehicle/vehicleRoute";

const port = config.port;
const app = express();
// parser
app.use(express.json());
// user
app.use("/api/v1/user",userRoute)
// login register
app.use("/api/v1/auth",authRoutes)
// vehicle
app.use("/api/v1/vehicles",vehicleRoute)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});