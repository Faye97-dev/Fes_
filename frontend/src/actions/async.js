import axios from "axios";
import { HOST } from "./types";

export const updateSolde = async () => {
  let data;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  await axios
    .get(HOST + `api/agence/get/2/`, config)
    .then((res) => {
      data = res.data;
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
      data = false;
    });

  return data;
};
