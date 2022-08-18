import mongoose from "mongoose";

const conn = () => {
  mongoose
    .connect(process.env.DB_URI, {
      dbName: "LensLight_TR",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to DB Successfuly");
    })
    .catch((err) => {
      console.log(`DB Connection err: ${err}`);
    });
};

export default conn;
