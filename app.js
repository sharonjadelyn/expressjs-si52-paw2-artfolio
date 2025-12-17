import express from 'express';
import database from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import artworkRoutes from "./routes/artworkRoutes.js";
import { authenticateTokenMiddleware } from "./middleware/authMiddleware.js";


const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/artworks", authenticateTokenMiddleware, artworkRoutes);


app.listen(3000, () => {
    database();
    console.log('App berjalan di http://localhost:3000');
});