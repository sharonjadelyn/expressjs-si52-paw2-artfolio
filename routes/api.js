import express from "express";
import * as userController from "../controllers/userController.js";
import * as artworkController from "../controllers/artworkController.js";
import * as commentController from "../controllers/commentController.js";
import { authenticateTokenMiddleware } from "../middlewares/authenticateTokenMiddleware.js";

const api = express.Router();

// AUTH
api.post("/users/signup", userController.signUp);
api.post("/users/signin", userController.signIn);

// ARTWORK (PROTECTED)
api.get("/artworks", authenticateTokenMiddleware, artworkController.artworks);
api.post("/artworks", authenticateTokenMiddleware, artworkController.addNewArtwork);
api.get("/artworks/:id", authenticateTokenMiddleware, artworkController.detailArtwork);
api.put("/artworks/:id", authenticateTokenMiddleware, artworkController.updateArtwork);
api.delete("/artworks/:id", authenticateTokenMiddleware, artworkController.deleteArtwork);

//COMMENT
api.get("/artworks/:artworkId/comments", authenticateTokenMiddleware, commentController.getCommentsByArtwork);
api.post("/artworks/:artworkId/comments", authenticateTokenMiddleware, commentController.addComment);

export default api;
