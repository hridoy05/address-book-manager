import dotenv from "dotenv";
dotenv.config();
if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotenv.config({ path: configFile });
} else {
  dotenv.config();
}
export let DB_URL = process.env.MONGO_URL;
