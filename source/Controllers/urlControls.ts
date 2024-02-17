import { Request, Response } from "express";
import { createUrlHelper, retrieveOneUrl } from "../Helpers/urlHelpers";
import { oneAnalytics } from "../Helpers/analyticsHelper";

const createUrl = async (req: Request, res: Response) => {
  try {
    const enteredUrl: string = req.body.url;
    console.log("in control");

    const { Message, newUrl, statuscode } = await createUrlHelper(enteredUrl);
    res.status(statuscode).json({ message: Message, url: newUrl });
  } catch (error: any) {
    console.log(error, "error");
    const { statuscode, errMessage } = error;

    return res.status(statuscode).json({ message: errMessage });
  }
};

const fetchOneURL = async (req: Request, res: Response) => {
  try {
    let id = req.query.id;
    id = String(id);
    console.log(id, "id");
    const entry = await retrieveOneUrl(id);
    console.log(entry, "entry");

    res.redirect(entry);
  } catch (error: any) {
    const { statuscode, errMessage } = error;

    return res.status(statuscode).json({ message: errMessage });
  }
};

const getOneAnalytics = async (req: Request, res: Response) => {
  try {
    const id = String(req.query.id);
    console.log(id, "id");
    const data = await oneAnalytics(id);

    return res.status(200).json({message:data})
  } catch (error: any) {
    const { statuscode, errMessage } = error;

    return res.status(statuscode).json({ message: errMessage });
  }
};

export { createUrl, fetchOneURL, getOneAnalytics };
