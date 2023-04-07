import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import helmet from "helmet";

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

export default app;
