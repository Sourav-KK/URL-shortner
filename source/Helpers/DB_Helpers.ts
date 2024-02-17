import mongoose from "mongoose";
import URL from "../Models/UrlModel";

const createURL = async (url: string, shortURL: String) => {
  try {
    const data = new URL({
      createdAt: Date.now(),
      shortendUrl: shortURL,
      originalUrl: url,
      visiteHistory: [],
    });
    console.log(data, "data");

    const newData = await data.save();
    return newData;
  } catch (error) {
    console.log(error, "error in createURL");
    throw error;
  }
};

const oneURL = async (id: string) => {
  try {
    const data: any = await URL.findOne(
      { shortendUrl: id },
      { originalUrl: 1, shortendUrl: 1, _id: 0 }
    );

    console.log(data, "data");
    return data;
  } catch (error) {}
};

const updateOne = async (id: string) => {
  console.log("in");

  const currentDate = new Date().toString();
  console.log(currentDate, "currentDate");

  const filter = { shortendUrl: id };
  const update = { $push: { visiteHistory: currentDate } };

  const datas = await URL.updateOne(filter, update);
  // console.log(datas, "datas");
  return datas;
};

const oneData = async (id: string) => {
  try {
    const filter = {
      shortendUrl: id,
    };
    const options = { visiteHistory: 1, _id: 0 };

    type dataType = {
      visiteHistory: string[];
    };

    const len: dataType | null = await URL.findOne(filter, options);

    if (len?.visiteHistory) {
      console.log(len, "length");
      const arrLength: number = len.visiteHistory.length;
      return arrLength;
    }
  } catch (error: any) {
    console.log(error.message, "erro in oneData");
    throw {
      statusCode: 500,
      errMessage: "URL not found",
    };
  }
};

export { createURL, oneURL, updateOne, oneData };
