import dotenv from 'dotenv'
dotenv.config()
if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotenv.config({ path: configFile });
} else {
  dotenv.config();
}
console.log(process.env.MONGO_URL);
export let DB_URL = process.env.MONGO_URL