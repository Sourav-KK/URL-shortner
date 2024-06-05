import { createURL, oneURL, updateOne } from "./DB_Helpers";
import create_UUID from "./UUID";

const createUrlHelper = async (enteredUrl: string) => {
  try {
    if (!enteredUrl) {
      throw {
        statuscode: 400,
        errMessage: "Url is required",
      };
    }

    const uniqueID: string = create_UUID();
    if (!uniqueID) {
      throw {
        statuscode: 500,
        errMessage: "Internal issue",
      };
    }

    const databaseResponse = await createURL(enteredUrl, uniqueID);

    if (!databaseResponse) {
      throw {
        statuscode: 500,
        errMessage: "Database issue",
      };
    }

    return {
      statuscode: 200,
      Message: "URL created",
      newUrl: databaseResponse.shortendUrl,
    };
  } catch (error) {
    throw error;
  }
};

const retrieveOneUrl = async (id: string) => {
  try {
    if (!id) {
      throw {
        statusCode: 400,
        errMessage: "id is required",
      };
    }

    const response = await oneURL(id);
    if (!response.originalUrl || !response.shortendUrl) {
      throw {
        statusCode: 500,
        errMessage: "Unable find the url",
      };
    }

    const isUpdated = await updateOne(id);

    if (!isUpdated.acknowledged || isUpdated.modifiedCount !== 1) {
      console.log("updation erroril aane");
      throw {
        statusCode: 500,
        errMessage: "Unexpected error",
      };
    }

    const realUrl: string = response.originalUrl;

    return realUrl;
  } catch (error: any) {
    throw {
      statusCode: 500,
      errMessage: error.message,
    };
  }
};

export { createUrlHelper, retrieveOneUrl };
