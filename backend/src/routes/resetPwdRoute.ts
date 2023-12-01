import { Router } from "express";
import { resetPassword, resetRequest } from "../controllers/resetController";

const resetRoute = Router();

resetRoute.post("/reset-password", resetRequest);

resetRoute.post("/reset-password/:token", resetPassword);

export { resetRoute };
