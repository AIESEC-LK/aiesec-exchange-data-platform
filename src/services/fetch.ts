import axios from "axios";
import { FilterRequestBody } from "@/app/api/route";

export const fetchFilteredData = async (body: FilterRequestBody) => {
  try {
    console.log("body", body);
    console.log("Fetching data");
    const response = await axios.post("/api/", body);
    console.log("Data fetched", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};
