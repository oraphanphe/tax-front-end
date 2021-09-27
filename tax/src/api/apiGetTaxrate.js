import api from "./api2";

export const getTaxrateAll = async () => {
    try {
        const response = await api.get(`/taxrate/searchGET`);
        if (response.status === 200) {
            console.log('getTaxrateAll response ', response.data);
            return response;
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        console.log("msg", err);
        throw err;
    }
}

export const getTaxrate = async (no) => {
    try {
        const inputPost = {};
        const response = await api.post(`/taxrate/search?type=${no}`, inputPost);
        if (response.status === 200) {
            console.log('getTaxrate response ', response.data);
            return response;
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        console.log("msg", err);
        throw err;
    }
}