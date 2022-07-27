import express from "express";
import controllers from "../controllers/index.js";

const router = express.Router();

router.get("/users", controllers.getAllUsers);
router.get("/users/:telegramId", controllers.getUser);
router.post("/users/:telegramId", controllers.createUser);
router.post("/users/:telegramId/updateClick", controllers.updateUserClick);
router.post("/users/:telegramId/updatePoint", controllers.updateUserPoint);
router.post("/users/:telegramId/point/use", controllers.takeUserPoint);

router.get("/vids", controllers.getAllVids);
router.get("/vids/expired", controllers.getExpiredVids); // must in above getVid() so that it wouldn't return nothing
router.get("/vids/:id", controllers.getVid);
router.post("/vids", controllers.createVid);
router.post("/vids/:id", controllers.updateVidInfo);
router.post("/vids/:id/click", controllers.updateVidClick);

export default router;
