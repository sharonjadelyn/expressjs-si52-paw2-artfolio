import express from 'express';
import database from "./config/database.js";

const app = express();
app.use(express.json());


app.listen(3000, () => {
    database();
    console.log('App berjalan di http://localhost:3000');
});