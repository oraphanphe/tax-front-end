import { useState, useEffect } from "react";
import apiSpring from "../../api/apiSpring";

export const insertTaxCatalog = async (taxCatalogId, name, nameTh, nameEn, description, descriptionTh, descriptionEn, status, effectiveDate, updateUser, updateTime) => {
   const request = {
        taxCatalogId: taxCatalogId,
        name: name,
        nameTh:nameTh, 
        nameEn:nameEn,
        description:description, 
        descriptionTh:descriptionTh, 
        descriptionEn:descriptionEn,
        status:status, 
        effectiveDate:effectiveDate, 
        createUser:updateUser,
        updateUser:updateUser,
        createTime:updateTime,
        updateTime:updateTime
    };
    try
    {
        const response = await apiSpring.post("/taxCatalog/add",request);   
        console.log("insertTaxCatalog response=",response.data);
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
export const updateTaxCatalog= async (taxCatalogId, name, nameTh, nameEn, description, descriptionTh, descriptionEn, status, effectiveDate, updateUser, updateTime) => {

    const request = {
        taxCatalogId: taxCatalogId,
        name: name,
        nameTh:nameTh, 
        nameEn:nameEn,
        description:description, 
        descriptionTh:descriptionTh, 
        descriptionEn:descriptionEn,
        status:status, 
        effectiveDate:effectiveDate,
        updateUser:updateUser,
        updateTime:updateTime
    };

    try
    {
        console.log("updateTaxCatalog request=",request.data);
        const response = await apiSpring.put("/taxCatalog/update",request);  
        console.log("updateTaxCatalog response=",response.data);
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
export const deleteTaxCatalog = async (no) => {

    const response = await apiSpring.delete("/taxCatalog/delete/"+no);  
    console.log("deleteTaxCatalog response=",response.data);
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