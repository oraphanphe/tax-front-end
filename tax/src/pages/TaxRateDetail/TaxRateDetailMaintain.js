import React, { useEffect, useState } from "react";
import {Button } from "reactstrap";
import styles from "../../components/TaxStyle/TaxStlye.module.css";
import {Container,InputWithLabel,Wrapper,} from "../../components/shared";
import { useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { confirm } from "../../components/Container/Comfirmation";
import apiSpring from "../../api/apiSpring";
import axios from "axios";
import {insertTaxRateDetail,updateTaxRateDetail,deleteTaxRateDetail} from "./ModelTaxRateDetail";
import { useLocation } from "react-router-dom";
import { get } from 'lodash';
const TaxRateDetailMaintain = () => {
  const location = useLocation();
  const history = useHistory();
  const taxrateDetail = get(location, "state", {});
  console.log("taxrateDetail", taxrateDetail);
  console.log("location", location);
  const [taxRateId, setTaxRateId] = useState("");
  const [rateNo, setRateNo] = useState("");
  const [minAmt, setMinAmt] = useState("");
  const [maxAmt, setMaxAmt] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");
  const [taxAmt, setTaxAmt] = useState("");
  const [taxSum, setTaxSum] = useState("");
  const [updateUser, setUpdateUser] = useState("");
  const [updateTime, setUpdateTime] = useState("");
  const [disableTime, setDisableTime] = useState(false);
  const [pressEdit, setPressEdit] = useState(false);
  const [result, setResult] = useState([]);
  let canInsert = false;
  const taxrateDetailPush= () => {
      history.push("/taxrateDetail");
  }

  useEffect(() => {
    fetchData();
  }, []);
  
//----------------------------for SearchAll spring boot------------------------
  const fetchData = async () => {

    console.log("taxrateDetail fetchData", taxrateDetail);
    console.log("location fetchData", location);
    if(taxrateDetail === null){
      console.log("taxrateDetail fetchData NULL", taxrateDetail);
      setPressEdit(false);
      setTaxRateId("");
      setRateNo("");
      setMinAmt("");
      setMaxAmt("");
      setRate("");
      setAmount("");
      setTaxAmt("");
      setTaxSum("");
      setUpdateUser("");
      setUpdateTime("");
    }
    else{
      setPressEdit(true);
      setTaxRateId(taxrateDetail.taxRateDetailGroup.taxRateId);
      setRateNo(taxrateDetail.taxRateDetailGroup.rateNo);
      setMinAmt(taxrateDetail.minAmt);
      setMaxAmt(taxrateDetail.maxAmt);
      setRate(taxrateDetail.rate);
      setAmount(taxrateDetail.amount);
      setTaxAmt(taxrateDetail.taxAmt);
      setTaxSum(taxrateDetail.taxSum);
      setUpdateUser(taxrateDetail.updateUser);
      setUpdateTime(taxrateDetail.updateTime);
      console.log("taxrateDetail fetchData !NULL", taxrateDetail.taxRateDetailGroup.taxRateId);
      console.log("taxrateDetail fetchData !NULL", taxrateDetail.taxRateDetailGroup.rateNo);
    }
  };

  //----------------------------for insert spring boot------------------------
  const insertTaxRateDetailProcess = async (taxRateId, rateNo, minAmt, maxAmt, rate,amount, taxAmt, taxSum ,
    updateUser, updateTime) => {
    try
    {
        const response = await insertTaxRateDetail(taxRateId, rateNo, minAmt, maxAmt, rate,amount, taxAmt, taxSum ,
          updateUser, updateTime);
    // add row ในตาราง
        setResult([...result, { taxRateId:taxRateId, rateNo:rateNo, minAmt:minAmt, maxAmt:maxAmt, rate:rate,
          amount:amount, taxAmt:taxAmt, taxSum:taxSum , updateUser:updateUser, updateTime:updateTime}]);
        alert("บันทึกข้อมูลเรียบร้อยแล้ว");
        taxrateDetailPush();
    }
    catch (err) 
    {  
      throw new Error("พบข้อผิดพลาดในการบันทึกข้อมูล! ",err);
    }
  };
//----------------------------for update spring boot------------------------
const updateTaxRateDetailProcess = async (taxRateId, rateNo, minAmt, maxAmt, rate,amount, taxAmt, taxSum ,
  updateUser, updateTime) => {
  try
  {
    const response = await updateTaxRateDetail(taxRateId, rateNo, minAmt, maxAmt, rate,amount, taxAmt, taxSum ,
      updateUser, updateTime);
    alert("แก้ไขข้อมูลเรียบร้อยแล้ว");
    taxrateDetailPush();
  }
  catch (err) 
  {  
    throw new Error("พบข้อผิดพลาดในการแก้ไขข้อมูล! ",err);
  }
};
  //----------------------------for delete spring boot------------------------
  const deleteTaxRateDetailProcess = async (taxRateId,_processType) => {
    try
    {
      const response = await deleteTaxRateDetail(taxRateId);
      setResult(result.filter((item) => item.taxRateId !== taxRateId)); //ให้แสดงข้อมูลทั้งหมดใน result โดยไม่แสดง no ที่ส่งเข้ามา
      TaxRateDetailClear();
      alert("ลบข้อมูลเรียบร้อยแล้ว");
      taxrateDetailPush();
    }
    catch (err) 
    {  
      throw new Error("พบข้อผิดพลาดในการลบข้อมูล! ",err);
    }
  };

  const TaxRateDetailSave = () => {
    if (rateNo === "") {
      alert("กรุณากรอกขั้นเงินได้!");
    } 
    else if(minAmt === ""){
      alert("กรุณากรอกจำนวนเงินได้ต่ำสุด!"); 
    }
    else if(maxAmt === ""){
      alert("กรุณากรอกจำนวนเงินสูงสุด!"); 
    }
    else if(rate === ""){
      alert("กรุณากรอกอัตราภาษี(%)!"); 
    }
    else if(amount === ""){
      alert("กรุณากรอกจำนวนเงิน!"); 
    }
    else if(taxAmt === ""){
      alert("กรุณากรอกภาษีในแต่ละขั้น!"); 
    }
    else if(taxSum === ""){
      alert("กรุณากรอกภาษีสะสมสูงสุด!"); 
    }
    else 
    {
     
        if (pressEdit) 
          updateTaxRateDetailProcess(taxRateId, rateNo, minAmt, maxAmt, rate,amount, taxAmt, taxSum , 
            updateUser, updateTime);
        else 
          insertTaxRateDetailProcess(taxRateId, rateNo, minAmt, maxAmt, rate,amount, taxAmt, taxSum , 
            updateUser, updateTime);

        //-----------------------------------------------------------------------
        TaxRateDetailClear();
        setDisableTime(true);
    }
  };

const TaxRateDetailClear = () => {
  setPressEdit(false);
  setTaxRateId("");
  setRateNo("");
  setMinAmt("");
  setMaxAmt("");
  setRate("");
  setAmount("");
  setTaxAmt("");
  setTaxSum("");
  setUpdateUser("");
  setUpdateTime("");
  setDisableTime(true);
};
 
const dlgConfirm = async (param) => {
  if (await confirm("ต้องการลบข้อมูลใช่หรือไม่?")) 
  {
      deleteTaxRateDetailProcess(param.taxRateId,"D");
  }
};
const removeData = (param) => {
  setPressEdit(false);
  dlgConfirm(param);
};

  return (
    <Container>
      <Wrapper>
        <br></br>
        <h2 className={styles.title}>กำหนดตารางอัตราภาษี</h2>
        <br></br>
         <div>
          <table>
            <tr>
              <td>
                <InputWithLabel label="ตารางภาษี" value={taxRateId} onChange={(e) => {setTaxRateId(e.target.value); }} showTime={disableTime} />
              </td>
            </tr>
            <tr>
              <td>
                <InputWithLabel label="ขั้นเงินได้" value={rateNo} width="300px" onChange={(e) => { setRateNo(e.target.value); }} showTime={disableTime}/>
              </td>
            </tr>
            <tr>
              <td>
                <InputWithLabel label="จำนวนเงินได้ต่ำสุด" value={minAmt}  width="300px" onChange={(e) => { setMinAmt(e.target.value); }} showTime={disableTime}/>
              </td>
              <td>
                <InputWithLabel label="จำนวนเงินได้สูงสุด" value={maxAmt}  width="300px" onChange={(e) => { setMaxAmt(e.target.value); }}showTime={disableTime}/>
              </td>
            </tr>
            <tr>
              <td>
                <InputWithLabel label="อัตราภาษี(%)" value={rate}  width="300px" onChange={(e) => { setRate(e.target.value); }}showTime={disableTime}/>
              </td>
            </tr>
            <tr>
              <td>
                <InputWithLabel label="จำนวนเงิน" value={amount}  width="300px" onChange={(e) => { setAmount(e.target.value); }}showTime={disableTime} />
              </td>
            </tr> 
            <tr>
              <td>
                <InputWithLabel label="ภาษีในแต่ละขั้น" value={taxAmt}  width="300px" onChange={(e) => { setTaxAmt(e.target.value); }}showTime={disableTime}/>
              </td>
              <td>
                <InputWithLabel label="ภาษีสะสมสูงสุด" value={taxSum}  width="300px" onChange={(e) => { setTaxSum(e.target.value); }}showTime={disableTime} />
              </td>
              &nbsp;
            </tr> 
            <tr>
              <td>
                <InputWithLabel label="ผู้อับเดทล่าสุด" value={updateUser}  width="300px" onChange={(e) => { setUpdateUser(e.target.value); }}showTime={disableTime}/>
              </td>
              <td>
                <InputWithLabel label="วันที่อับเดทล่าสุด" value={updateTime}  width="300px" onChange={(e) => { setUpdateTime(e.target.value); }}showTime={disableTime} />
              </td>
            </tr>
          </table>
        </div>
        <br></br>
        <div className={styles.center}>
          <tr>
            <td>
              { <Button color="primary" type="button" onClick={TaxRateDetailSave}>
                Save
              </Button> }
              &nbsp;&nbsp;&nbsp;
            </td>
            <td>
              <Button color="primary" type="button" onClick={() => removeData(taxrateDetail)}>
                Delete
              </Button>
              &nbsp;&nbsp;&nbsp;
            </td>
            <td>
              <Button color="primary" type="button" onClick={() =>  taxrateDetailPush()}>
                Cancel
              </Button>
            </td>
          </tr>
        </div>
        <br></br> 
      </Wrapper>
    </Container>
  );
};
export default TaxRateDetailMaintain;