import { oneData } from "./DB_Helpers"

const oneAnalytics = async (id:string) => {
      try {
           const analysis = await oneData(id)
           return analysis
      } catch (error) {
            
      }
}

export{
      oneAnalytics
}