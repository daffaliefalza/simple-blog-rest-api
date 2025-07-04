import mongoose from "mongoose";
import app from "./app.js";

mongoose
  .connect("mongodb://127.0.0.1:27017/react-restapi")
  .then(() => {
    console.log("database connected");
    app.listen(3005, () => {
      console.log("server is running in port 3005");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
