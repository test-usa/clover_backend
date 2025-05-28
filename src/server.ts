import mongoose from "mongoose";
import app from "./app";
import cors from "cors";
import config from "./app/config";

let server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    
    app.use(cors());

    server = app.listen(config.port, () => {
      console.log(`Legalmate is litening from port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
