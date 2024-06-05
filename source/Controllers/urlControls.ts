import { Request, Response } from "express";
import { createUrlHelper, retrieveOneUrl } from "../Helpers/urlHelpers";
import { oneAnalytics } from "../Helpers/analyticsHelper";

const createUrl = async (req: Request, res: Response) => {
  try {
    const enteredUrl: string = req.body.url;

    const { Message, newUrl, statuscode } = await createUrlHelper(enteredUrl);
    return res.status(statuscode).json({ message: Message, url: newUrl });
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
    const entry = await retrieveOneUrl(id);

    res.redirect(entry);
  } catch (error: any) {
    const { statuscode, errMessage } = error;

    return res.status(statuscode).json({ message: errMessage });
  }
};

const getOneAnalytics = async (req: Request, res: Response) => {
  try {
    const id = String(req.query.id);
    const data = await oneAnalytics(id);

    return res.status(200).json({ message: data });
  } catch (error: any) {
    const { statuscode, errMessage } = error;

    return res.status(statuscode).json({ message: errMessage });
  }
};

export { createUrl, fetchOneURL, getOneAnalytics };
