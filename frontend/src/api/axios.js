import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000", // the url of our baackend api
});
