import express, { Router } from "express";
import { createUrl, fetchOneURL, getOneAnalytics } from "../Controllers/urlControls";

const router: Router = express.Router();

router.route("/").post(createUrl).get(fetchOneURL);
router.route("/analytics").get(getOneAnalytics);


export default router;
