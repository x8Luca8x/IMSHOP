
import auth from "./auth";
import axios from "axios";
import Device from "./device";
import appInfo from "./app-info";

const axiosInstance = axios.create({
    baseURL: appInfo.apiURL,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Language": "de-DE",
        "Device": JSON.stringify(Device.getDevice())
    }
});

axiosInstance.interceptors.request.use(r => {
    
    r.headers["Authorization"] = "IM " + auth.getToken();
    return r;
});

const api =
{
    async unauthorizedRequest()
    {
        await auth.logOut();
    },

    async get(route)
    {
        try
        {
            const response = await axiosInstance.get(route);
            return response;
        }
        catch (error)
        {
            if (error.response !== undefined && error.response.status === 401)
            {
                await this.unauthorizedRequest();
            }
            else
            {
                throw error;
            }
        }
    },

    async post(route, data)
    {
        try
        {
            const response = await axiosInstance.post(route, data);
            return response;
        }
        catch (error)
        {
            if (error.response !== undefined &&error.response.status === 401)
            {
                await this.unauthorizedRequest();
            }
            else
            {
                throw error;
            }
        }
    },

    async put(route, data)
    {
        try
        {
            const response = await axiosInstance.put(route, data);
            return response;
        }
        catch (error)
        {
            if (error.response !== undefined &&error.response.status === 401)
            {
                await this.unauthorizedRequest();
            }
            else
            {
                throw error;
            }
        }
    },

    async delete(route)
    {
        try
        {
            const response = await axiosInstance.delete(route);
            return response;
        }
        catch (error)
        {
            if (error.response !== undefined &&error.response.status === 401)
            {
                await this.unauthorizedRequest();
            }
            else
            {
                throw error;
            }
        }
    }
};

export default api;