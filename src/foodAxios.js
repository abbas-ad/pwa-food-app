import axios from "axios";

const instance = axios.create({
  baseURL: "http://neocart.ir/public_html/api",
});

export default instance;
