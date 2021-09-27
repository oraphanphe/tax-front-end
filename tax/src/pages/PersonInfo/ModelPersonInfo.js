import { useState, useEffect } from "react";
import apiSpring from "../../api/apiSpring";
export const insertPersonInfo = async (personId, effectiveDate, citizenId, taxId, socId, preName, 
    firstName, lastName, address, tambon, zipcode, email, phone, status, updateUser, updateTime) => {
    console.log("insertPersonInfo personId =",personId);
    console.log("insertPersonInfo effectiveDate =",effectiveDate);
    const request = {
        personId:personId,
        effectiveDate:effectiveDate, 
        citizenId:citizenId, 
        taxId:taxId, 
        socId:socId, 
        preName:preName, 
        firstName:firstName, 
        lastName:lastName, 
        address:address, 
        tambon:tambon, 
        zipcode:zipcode,
        email:email, 
        phone:phone, 
        status:status, 
        createUser:updateUser,
        updateUser:updateUser, 
        createTime:updateTime,
        updateTime:updateTime
    };   
    try
    {
        const response = await apiSpring.post("/personInfo/add",request);   
        console.log("insertPersonInfo response=",response.data);
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
export const updatePersonInfo= async (personId, effectiveDate, citizenId, taxId, socId, preName, 
    firstName, lastName, address, tambon, zipcode, email, phone, status, updateUser, updateTime) => {
   
    console.log("updatePersonInfo personId =",personId);
    console.log("updatePersonInfo effectiveDate =",effectiveDate);
    console.log("updatePersonInfo citizenId =",citizenId);
    const request = {
        personId:personId,
        effectiveDate:effectiveDate, 
        citizenId:citizenId, 
        taxId:taxId, 
        socId:socId, 
        preName:preName, 
        firstName:firstName, 
        lastName:lastName, 
        address:address, 
        tambon:tambon, 
        zipcode:zipcode,
        email:email, 
        phone:phone, 
        status:status, 
        updateUser:updateUser, 
        updateTime:updateTime
    };
    try
    {
        const response = await apiSpring.put("/personInfo/update",request);  
        console.log("updatePersonInfo response=",response.data);
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
export const deletePersonInfo = async (no) => {
    const response = await apiSpring.delete("/personInfo/delete/"+no);  
    console.log("deletePersonInfo response=",response.data);
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