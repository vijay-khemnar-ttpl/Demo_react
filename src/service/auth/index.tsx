import config from "../../config";
import axios from "axios";

const BACKEND_BASE_URL = config.BACKEND_BASE_URL;
export const AuthApis = {
  signin: (payload: object) =>
    axios.post(`${BACKEND_BASE_URL}users/api/v1/login`, payload),

  signup: (payload: object) =>
    axios.post(`${BACKEND_BASE_URL}users/api/v1/registration`, payload),
};
