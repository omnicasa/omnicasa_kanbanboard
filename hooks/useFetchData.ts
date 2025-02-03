import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async () => {
  const { data } = await axios.get("/api/data");
  return data;
};

export const useFetchData = () => {
  return useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
  });
};
