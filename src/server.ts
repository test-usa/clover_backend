import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

let server;

async function main() {
  try {
    await mongoose.connect("mongodb+srv://sakib:sakib@development.hqochfk.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=development");
    
    server = app.listen(config.port, () => {
      console.log(`Legalmate is litening from port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
