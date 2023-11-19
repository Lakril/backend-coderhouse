import { Router } from "express";
import cartController from "../controller/cartController.js";

export const cartRoutes = Router();


cartRoutes.get('/', cartController.getController);


