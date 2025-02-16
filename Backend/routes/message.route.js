import express from "express"
import { getMessage, sendMessage } from "../controller/message.controller.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router()
  
router.route("/send/:id").post(secureRoute,sendMessage);
router.route("/get/:id").get(secureRoute,getMessage);

export default router