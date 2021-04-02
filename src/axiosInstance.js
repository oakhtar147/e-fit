import axios from "axios";

const instance = axios.create({
  baseURL: "https://e-fitness-2fab5-default-rtdb.firebaseio.com/",
});

export default instance;
