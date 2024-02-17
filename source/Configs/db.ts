import mongoose from "mongoose";

async function dbConfig(dbUrl: string, SelectionTimeoutMS: string) {
  async function connect(): Promise<void> {
    try {
      const serverSelectionTimeoutMS = Number(SelectionTimeoutMS);

      await mongoose.connect(dbUrl, { serverSelectionTimeoutMS });
      console.info("database is connected");
    } catch (error: any) {
      console.error(
        `Error occured while connecting to MongoDB: ${error.message}`
      );
      console.error(`Error from MongoDB: ${mongoose.Error.Messages}`);

      endConnection();

      console.info("Restarting connection to mongodb");
      connect();
    }
  }

  function endConnection(): void {
    console.warn("Disconnecting to mongodb server");
    mongoose.disconnect();
  }
  return {
    connect,
    endConnection,
  };
}
export default dbConfig;
