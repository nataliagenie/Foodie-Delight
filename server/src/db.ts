import { error } from "console";
import mongoose from "mongoose";

const mongoDbUrl: string = process.env.MONGO_DB_URL as string;
const options: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(mongoDbUrl, options)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error: Error) => {
    console.error("Error connecting to MongoDB", error);
  });

mongoose.connection.on("open", function () {
  console.log("Connected to mongo server.");

  mongoose.connection.db.listCollections().toArray()
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.error("Error listing collections:", error);
    });

    (function (err: any, names: any) {
      if (err) {
        console.error("Error listing collections:", err);
      } else {
        console.log(names);
      }
    });
});

export default mongoose;
