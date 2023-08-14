import express from "express";
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors'
import { videoListRouter, productListRouter, commentListRouter } from "../src/routes/routes.js";


dotenv.config()
const app = express();
const PORT = process.env.PORT

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/videos', videoListRouter)
app.use('/api/product', productListRouter)
app.use('/api/comment', commentListRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

mongoose.connect(process.env.MONGODB_DATABASE_URL)
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('failed to connect', error)
})

db.once('connected', () => {
  console.info('Database Connected')
})

// app.get('/', (req, res) => {
//   return res.send('Hello World')
// })