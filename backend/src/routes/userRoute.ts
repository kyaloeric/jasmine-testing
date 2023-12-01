import { Router } from "express";
import {
  registerUser,
  loginUser,
  updateUser,
  getAllUsers,
  getUserDetails,
  checkCredentials,
} from "../controllers/userController";

import { verifyToken } from "../middleware/verifyToken";


// const { tokenVerfying } = require("../Middleware/tokenVerify");

const userRoute = Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.put("/update/:userId", verifyToken, updateUser);
userRoute.get('/',verifyToken,getAllUsers);
userRoute.get('/details/:userId',verifyToken, getUserDetails);
userRoute.get('/checkUserDetails', verifyToken, checkCredentials);


export { userRoute };
