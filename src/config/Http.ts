import axios from "axios";
const baseURL = `${process.env.NEXT_PUBLIC_PYTHON_BASE_URL}`;

const Http = () => {
  const instance = axios.create({ baseURL, withCredentials: true });
  instance.interceptors.request.use(async (request) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response) {
        const { status } = error.response;

        if (status === 401) {
          localStorage.clear();
          if (localStorage.getItem("access_token")) {
            const data = await refreshToken();
            if (data) {
              return await axios.request(error.config);
            } else {
              localStorage.clear();
              window.location.href = "/login";
            }
          } else {
            return error?.response || { error: "An error occurred" };
          }
        } else if (status === 500) {
          // window.location.href = "/server-error";
        }
      }
      return error?.response || { error: "An error occurred" };
    }
  );

  return instance;
};

export default Http();

const refreshToken = async () => {
  const instance = axios.create({ baseURL, withCredentials: true });
  const refresh=localStorage.getItem("refresh_token")
  const { data } = await instance.post("user/refresh-token",{refresh});
  
  if (data && data.access && data.refresh) {
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
    return true;
  }
  return false;
};
