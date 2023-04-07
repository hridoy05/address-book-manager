import http from "http";
import connectDB from "./db/connect.js";
import app from "./app.js";

const server = http.createServer(app);

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
