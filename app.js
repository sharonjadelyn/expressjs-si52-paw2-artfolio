import express from 'express';
import database from "./config/database.js";
import api from './routes/api.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api", api);

app.get("/", (req, res) => {
  res.status(200).json({
    message : "OK"
  })
});

app.listen(3000, () => {
    database();
    console.log('App berjalan di http://localhost:3000');
});