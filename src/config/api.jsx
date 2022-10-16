import axios from "axios";

export const API = axios.create(
  {
    baseURL: "https://kendaraan-apk.herokuapp.com/api/v1/",
  }
  //   {
  //   baseURL: process.env.REACT_APP_BASEURL,
  // }
);
