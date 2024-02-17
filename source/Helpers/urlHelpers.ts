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
    console.log(databaseResponse, "databaseResponse");

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
    console.log(error, "erro in url helpers");
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
    console.log("first");
    if (!response.originalUrl || !response.shortendUrl) {
      throw {
        statusCode: 500,
        errMessage: "Unable find the url",
      };
    }

    console.log("after");
    const isUpdated = await updateOne(id);

    if (!isUpdated.acknowledged || isUpdated.modifiedCount !== 1 ) {
      console.log("updation erroril aane");
      throw {
        statusCode: 500,
        errMessage: "Unexpected error",
      };
    }
    console.log("nod error in updation");

    const realUrl: string = response.originalUrl;

    return realUrl;
  } catch (error: any) {
    console.log(error.message, "Error in retrieveOneUrl");
    throw {
      statusCode: 500,
      errMessage: error.message,
    };
  }
};

export { createUrlHelper, retrieveOneUrl };
