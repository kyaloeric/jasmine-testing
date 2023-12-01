import express, { NextFunction, Request, Response, json } from "express";
import cors from "cors";
import { userRoute } from "./routes/userRoute";
import { productRoute } from "./routes/productRoute";
import { cartRoute } from "./routes/cartRoute";
import { resetRoute } from "./routes/resetPwdRoute";


const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/reset", resetRoute);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: error.message,
  });
});


app.listen(4700, () => {
  console.log("Server active on port 4700");
});
