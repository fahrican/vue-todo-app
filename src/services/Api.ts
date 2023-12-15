import axios from "axios";

export default (url = 'https://backend4frontend-dnfm.onrender.com/api/v1/') => {
  return axios.create({
    baseURL: url
  });
}
