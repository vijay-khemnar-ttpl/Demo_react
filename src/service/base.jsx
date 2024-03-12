import Axios from "axios";
import { AuthActions } from "../contexts/auth";
// import { TOKEN_EXPIRED_MSG, localStorageKeys } from "../ccm-constant";
// import { loginRoute } from 'routes/guard/urls';

class HttpClient {
  static instance = null;

  static getInstance() {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }

    return HttpClient.instance;
  }

  accessToken = "";

  refreshToken = "";

  _authHandler = null;

  _dispatch = null;
  userRole = "";
  init = (authHandler, dispatch) => {
    this._authHandler = authHandler;
    this._dispatch = dispatch;
    Axios.interceptors.response.use(undefined, this.refreshHandler);
    // Axios.defaults.withCredentials = true; // important for POST request
    Axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    Axios.defaults.xsrfCookieName = "csrftoken";
  };

  refreshHandler = async (error) => {
    console.log("errrrrrrr", error);
    const orgRequest = error;
    const response = error?.response;

    const ErrorMessage = error?.response?.data?.error;
    if (ErrorMessage) return Promise.reject(error);

    if (!response) return Promise.reject(error);

    let msg = response.data?.detail;
    if (typeof msg === "string" && msg.includes("detail")) {
      msg = JSON.parse(msg).detail;
    }
    /* some API returns 422 Error: Unprocessable Entity
       with Response body
       {
        "message": "error message"
       }
    */
    if (!msg && response.data?.message) msg = response.data.message;
    console.log("org url", orgRequest);
    if (orgRequest.config.url.endsWith("/login")) return Promise.reject(msg);

    if (
      error.response.status === 401 &&
      // msg === TOKEN_EXPIRED_MSG &&
      !orgRequest._retry
    ) {
      if (orgRequest.url.indexOf("/refresh") >= 0) {
        if (this._dispatch) {
          // if (window.location.pathname !== loginRoute)
          //   window.localStorage.setItem(localStorageKeys.LastPagePathName, window.location.pathname);
          // this._dispatch({ type: AuthActions.clearUser });
        }

        throw new Error("Session expired. Please sign in again.");
      }

      orgRequest._retry = true;

      try {
        const tokens = await this._authHandler.refresh();
        if (tokens) {
          this.accessToken = tokens.access_token;
          this.refreshToken = tokens.refresh_token;
          this.userRole = tokens.role;
          if (this._dispatch) {
            this._dispatch({
              type: AuthActions.setUser,
              payload: {
                tokens: {
                  accessToken: this.accessToken,
                  refreshToken: this.refreshToken,
                  userRole: this.userRole,
                },
              },
            });
          }
        }

        // orgRequest.headers.Authorization = `Bearer ${this.accessToken}`;
        return Axios(orgRequest);
      } catch (e) {
        if (this._dispatch) {
          // if (window.location.pathname !== loginRoute)
          //   window.localStorage.setItem(localStorageKeys.LastPagePathName, window.location.pathname);
          // this._dispatch({ type: AuthActions.clearUser });
        }

        throw new Error("Token refresh failed");
      }
    }

    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
    // return Promise.reject(typeof msg === 'string' ? { message: msg } : msg);
  };

  prepareHeader = (headers = {}, token = null) => {
    var userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeZoneHeader = { "X-User-Timezone": userTimezone };
    return {
      ...headers,
      ...timeZoneHeader,
      Authorization: `Bearer ${token ?? this.accessToken}`,
    };
  };

  get = async (url, params = {}, headers = {}) => {
    const { data } = await Axios.get(url, {
      params,
      headers: this.prepareHeader(headers),
    });
    return data;
  };

  getInBlob = async (url, params = {}, headers = {}) => {
    const response = await Axios.get(url, {
      params,
      headers: this.prepareHeader(headers),
      responseType: "blob",
    });

    // content dispositon header can be sth like:
    //  1. `attachment; filename*=utf-8''Not%2520Responsive_Blue%2520Dragon.docx`
    //  2. `attachment; filename="UPLOAD-1_00000000.txt"`
    // see: https://http.dev/content-disposition
    const header = response.headers["content-disposition"];
    let name;
    if (header.startsWith("attachment; filename="))
      name = header.substring(
        'attachment; filename="'.length,
        header.length - 1
      );
    else if (header.startsWith("attachment; filename*=")) {
      name = header.substring(
        "attachment; filename*=utf-8''".length,
        header.length
      );
      name = decodeURIComponent(name);
    }
    return { data: response.data, name: decodeURIComponent(name) };
  };

  post = async (url, body, params = {}, headers = {}) => {
    const { data } = await Axios.post(url, body, {
      params,
      headers: this.prepareHeader(headers),
    });
    return data;
  };

  postWithConfig = async (url, body, config = {}) => {
    if (config.headers) {
      config.headers = this.prepareHeader(config.headers);
    }

    const { data } = await Axios.post(url, body, config);
    return data;
  };

  postWithToken = async (token, url, body, params = {}, headers = {}) => {
    const { data } = await Axios.post(url, body, {
      params,
      headers: this.prepareHeader(headers, token),
    });
    return data;
  };

  postInBlob = async (url, body, params = {}, headers = {}) => {
    const { data } = await Axios.post(url, body, {
      params,
      headers: this.prepareHeader(headers),
      responseType: "blob",
    });
    return data;
  };

  put = async (url, body, params = {}, headers = {}) => {
    const { data } = await Axios.put(url, body, {
      params,
      headers: this.prepareHeader(headers),
    });
    return data;
  };

  delete = async (url, params = {}, headers = {}) => {
    const { data } = await Axios.delete(url, {
      params,
      headers: this.prepareHeader(headers),
    });
    return data;
  };

  deleteWithData = async (url, params = {}, headers = {}) => {
    const { data } = await Axios.delete(url, {
      data: params,
      headers: this.prepareHeader(headers),
    });
    return data;
  };

  getObjectURL = async (url, params = {}, headers = {}) => {
    const response = await Axios.get(url, {
      params,
      headers: this.prepareHeader(headers),
      responseType: "blob",
    });
    return window.URL.createObjectURL(response.data);
  };
}

export default HttpClient.getInstance();
// {
//   "email":"ninemsjjim@gmail.com",
//   "details":{
//       "first_name": "John",
//       "last_name": "jkej",
//       "gender":"F",
//       "npi":"234456789",
//       "website":"ggggggggggggggggggggggggggggg",
//       "phone_number": "7894561230",
//       "display_name":"chellaram",
//       "speciality":"CARDIOLOGIST"
//   },
//   "address":{
//       "address_line_1": "joijoew",
//       "address_line_2":"kjnoke",
//       "country":"kmokd",
//       "city":"ijeoi",
//       "state":"oe0o",
//       "zip_code":"1234567890",
//       "billing_is_same": true,
//       "billing_address":{
//           "address_line_1": "joijoew",
//           "country":"kmokd",
//           "city":"ijeoi",
//           "state":"oe0o",
//           "zip_code":"1234567890"
//       }
//   }
// }
