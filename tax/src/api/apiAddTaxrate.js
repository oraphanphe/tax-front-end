import api from "./api2";

export const addTaxrate = async (taxrate) => {
    try {
        const inputPost = taxrate;
        const response = await api.post(`/taxrate/add`, inputPost);
        if (response.status === 200) {
            console.log('addTaxrate response ', response.data);
            return response.data;
        }
        else {
            console.log('addTaxrate response ', response.data);
            return "error";
        }
    }
    catch (err) {
        console.log("msg", err);
        return "error";
    }
}

export const updateTaxrate = async (taxrate) => {
    try {
        const inputPut = taxrate;
        const response = await api.put(`/taxrate/update`, inputPut);
        if (response.status === 200) {
            console.log('updateTaxrate response ', response.data);
            return response.data;
        }
        else {
            console.log('updateTaxrate response ', response.data);
            return "error";
        }
    }
    catch (err) {
        console.log("msg", err);
        return "error";
    }
}

export const deleteTaxrate = async (taxrate) => {
    try {
        console.log('deleteTaxrate ', taxrate);
        const no = taxrate;
        const response = await api.delete(`/taxrate/delete/${no}`);
        if (response.status === 200) {
            console.log('deleteTaxrate response ', response.data);
            return response.data;
        }
        else {
            return response.data;
        }
    }
    catch (err) {
        console.log("msg", err);
        return "error";
    }
}