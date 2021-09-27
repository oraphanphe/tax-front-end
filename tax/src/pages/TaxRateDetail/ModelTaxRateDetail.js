import { useState, useEffect } from "react";
import apiSpring from "../../api/apiSpring";
export const insertTaxRateDetail = async (taxRateId, rateNo, minAmt, maxAmt, rate,amount, taxAmt, taxSum ,
    updateUser, updateTime) => {
    console.log("insertTaxRateDetail taxRateId =",taxRateId);
    console.log("insertTaxRateDetail rateNo =",rateNo);
    console.log("insertTaxRateDetail minAmt =",minAmt);
    const request = {
        taxRateDetailGroup: {
            taxRateId:taxRateId,
            rateNo: rateNo
        },
        minAmt:minAmt, 
        maxAmt:maxAmt, 
        rate:rate, 
        amount:amount,
        taxAmt:taxAmt, 
        taxSum:taxSum, 
        createUser:updateUser,
        updateUser:updateUser,
        createTime:updateTime,
        updateTime:updateTime
    };   
    try
    {
        const response = await apiSpring.post("/taxRateDetail/add",request);   
        console.log("insertTaxRateDetail response=",response.data);
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
export const updateTaxRateDetail= async (taxRateId, rateNo, minAmt, maxAmt, rate,amount, taxAmt, taxSum ,
    updateUser, updateTime) => {
    console.log("updateTaxRateDetail taxRateId =",taxRateId);
    console.log("updateTaxRateDetail rateNo =",rateNo);
    console.log("updateTaxRateDetail minAmt =",minAmt);
    const request = {
        taxRateDetailGroup: {
            taxRateId:taxRateId,
            rateNo: rateNo
        },
        minAmt:minAmt, 
        maxAmt:maxAmt, 
        rate:rate, 
        amount:amount,
        taxAmt:taxAmt, 
        taxSum:taxSum, 
        updateUser:updateUser,
        updateTime:updateTime
    };
    try
    {
        const response = await apiSpring.put("/taxRateDetail/update",request);  
        console.log("updateTaxRateDetail response=",response.data);
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
export const deleteTaxRateDetail = async (no) => {
    const response = await apiSpring.delete("/taxRateDetail/delete/"+no);  
    console.log("deleteTaxRateDetail response=",response.data);
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