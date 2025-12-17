import express from "express";
import * as userController from "../controllers/userController.js";
import * as artworkController from "../controllers/artworkController.js";
import { authenticateTokenMiddleware } from "../middlewares/authenticateTokenMiddleware.js";

const router = express.Router();

// AUTH
router.post("/users/signup", userController.signUp);
router.post("/users/signin", userController.signIn);

// ARTWORK (PROTECTED)
router.get("/artworks", authenticateTokenMiddleware, artworkController.artworks);
router.post("/artworks", authenticateTokenMiddleware, artworkController.addNewArtwork);
router.get("/artworks/:id", authenticateTokenMiddleware, artworkController.detailArtwork);
router.put("/artworks/:id", authenticateTokenMiddleware, artworkController.updateArtwork);
router.delete("/artworks/:id", authenticateTokenMiddleware, artworkController.deleteArtwork);

export default router;
