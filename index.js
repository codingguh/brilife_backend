import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import LevelRoute from "./routes/LevelRoute.js";
import AgenRoute from "./routes/AgenRoute.js";
import AgenStrukturRoute from "./routes/AgenStrukturRoute.js";
const app = express();

app.use(cors());
app.use(express.json())
app.use(LevelRoute)
app.use(AgenRoute)
app.use(AgenStrukturRoute)

app.listen(5000,()=>console.log('server up and running'))