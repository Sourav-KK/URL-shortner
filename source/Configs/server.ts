import { Express } from "express";

export default async function startServer(
  PORT_NO: number | string,
  app: Express
) {
  app.listen(PORT_NO, () => {
    console.info(`Server up on port ${PORT_NO}`);
  });
}
