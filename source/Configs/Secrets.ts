import dotenv from "dotenv";
dotenv.config();

const PORT_NO: number |string = process.env.PORT_NO ?? 8080;
const MONGODB_URL: string = process.env.MONGODB_URL ?? "";
const SelectionTimeoutMS = process.env.SERVER_SELECTION_TIMEOUT_MS ?? "5000";


export { PORT_NO, MONGODB_URL, SelectionTimeoutMS };
