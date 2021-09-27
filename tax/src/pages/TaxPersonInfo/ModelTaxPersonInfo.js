import { useState, useEffect } from "react";
import apiSpring from "../../api/apiSpring";
export const insertTaxPersonInfo = async (salseId, employeeType, incomeCatalogId, rdRequest, rdDate, 
    receiveCer, status, updateUser, updateTime) => {
    console.log("insertTaxPersonInfo salseId =",salseId);
    console.log("insertTaxPersonInfo employeeType =",employeeType);
    const request = {
        salseId:salseId, 
        employeeType:employeeType, 
        incomeCatalogId:incomeCatalogId, 
        rdRequest:rdRequest, 
        rdDate:rdDate, 
        receiveCer:receiveCer, 
        status:status, 
        createUser:updateUser,
        updateUser:updateUser, 
        createTime:updateTime,
        updateTime:updateTime
    };   
    try
    {
        const response = await apiSpring.post("/taxPersonInfo/add",request);   
        console.log("insertTaxPersonInfo response=",response.data);
        if (response.status === 200) //data=success
            return response.data;
        else 
            throw new Error();
    }
    catch (err) 
    {  
        throw err;
    }
};
//----------------------------for update spring boot------------------------
export const updateTaxPersonInfo= async (salseId, employeeType, incomeCatalogId, rdRequest, rdDate, 
    receiveCer, status, updateUser, updateTime) => {
   
    console.log("updateTaxPersonInfo salseId =",salseId);
    console.log("updateTaxPersonInfo employeeType =",employeeType);
    const request = {
        salseId:salseId, 
        employeeType:employeeType, 
        incomeCatalogId:incomeCatalogId, 
        rdRequest:rdRequest, 
        rdDate:rdDate, 
        receiveCer:receiveCer, 
        status:status, 
        updateUser:updateUser, 
        updateTime:updateTime
    };
    try
    {
        const response = await apiSpring.put("/taxPersonInfo/update",request);  
        console.log("updateTaxPersonInfo response=",response.data);
        if (response.status === 200) //data=success
            return response.data;
        else 
            throw new Error();
    }
    catch (err) 
    {  
        throw err;
    }
};
//----------------------------for delete spring boot------------------------
export const deleteTaxPersonInfo = async (no) => {
    const response = await apiSpring.delete("/taxPersonInfo/delete/"+no);  
    console.log("deleteTaxPersonInfo response=",response.data);
    try
    {
        if (response.status === 200) //data=success
            return response.data;
        else 
            throw new Error();
    }
    catch (err) 
    {  
        throw err;
    }
};