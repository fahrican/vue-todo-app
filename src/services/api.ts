import axios, {AxiosInstance} from "axios";

const baseURL = 'https://backend4frontend-dnfm.onrender.com/api/v1/';
const instance: AxiosInstance = axios.create({baseURL});

export default instance;
