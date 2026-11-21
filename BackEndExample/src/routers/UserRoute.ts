import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();
const controller = new UserController();

router.get("/findAll", controller.findAll);
router.post("/insertOne", controller.insertOne);

export default router;
