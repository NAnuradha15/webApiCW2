import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

const weatherDataSchema = new mongoose.Schema();

const WeatherDataModel = mongoose.model("datas", weatherDataSchema);
app.use(cors());
app.get("/getdata", async (req, res) => {
  WeatherDataModel.find({})
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.log(err);
    });
});
