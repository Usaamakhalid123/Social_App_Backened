import mongoose from "mongoose";

const connectDB = async () => {
  const uri = "mongodb://127.0.0.1:27017/socialapp";  //  URL of mongdob service
  mongoose
    .connect(uri, {
      autoCreate: true,
      autoIndex: true,
    })
    .then((res) => {
      console.log("Connected db connection");
    })
    .catch((err) => {
      console.log("Error connecting db connection", err);
    });
};

export default connectDB;
