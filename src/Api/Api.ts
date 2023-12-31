import HttpConfig from "../config/HttpConfig";

const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}api/`;

export const post = async (query: string, formData: any) => {
  try {
    const { data } = await HttpConfig.post(query, formData);
    return data;
  } catch (error: any) {
    return error?.response?.data || { error: "An error occurred" };
  }
};

  export const refreshToken = async (token: string) => {
    try { 
      const response = await fetch(`${baseURL}auth/refresh`, {
        method: 'GET', 
        headers: {
          'Authorization':  `Bearer ${token}`, 
          'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
        },
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return error?.response?.data || { error: "An error occurred" };
    }
  };

  export const adminRefreshToken = async (token: string) => {
    try { 
      
      const response = await fetch(`${baseURL}admin/refresh`, {
        method: 'GET', 
        headers: {
          'Authorization':  `Bearer ${token}`, 
          'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
        },
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return error?.response?.data || { error: "An error occurred" };
    }
  };

  
export const get = async (query: string) => {
  try {
    const { data } = await HttpConfig.get(query);
    return data;
  } catch (error: any) {
    return error?.response?.data || { error: "An error occurred" };
  }
};

export const deleteData = async (query: string) => {
  try {
    const { data } = await HttpConfig.delete(query);
    return data;
  } catch (error: any) {
    return error?.response?.data || { error: "An error occurred" };
  }
};

export const put = async (query: string, formData: any) => {
  try {
    const { data } = await HttpConfig.put(query, formData);
    return data;
  } catch (error: any) {
    return error?.response?.data || { error: "An error occurred" };
  }
};
