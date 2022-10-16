import axios from "axios";

export const API = axios.create(
  {
    baseURL: "https://dbappkendaraan.herokuapp.com/api/v1/",
  }
  //   {
  //   baseURL: process.env.REACT_APP_BASEURL,
  // }
);
