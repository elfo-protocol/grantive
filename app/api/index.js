import dotenv from 'dotenv'
import express from 'express'
const app = express()
const port = 5000
import cors from 'cors'
import * as https from "https";
import * as fs from 'fs';

import {generateUploadURL} from './s3.js'
dotenv.config()
app.use(cors())

var privateKey = fs.readFileSync( '../privatekey.pem' );
var certificate = fs.readFileSync( '../certificate.pem' );

app.get('/get-upload-url', async (req, res) => {
  const url = await generateUploadURL()
  res.send({url})
})


https.createServer({
  key: privateKey,
  cert: certificate
}, app).listen(port);
