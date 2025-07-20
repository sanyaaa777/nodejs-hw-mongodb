import express from "express";
import dotenv from "dotenv";
import { initMongoConnection } from "./db/initMongoConnection.js";
import contactsRouter from "./routers/contacts.js";


dotenv.config();

const app = express();

app.use(express.json());
app.use("/contacts", contactsRouter);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await initMongoConnection();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

start();
