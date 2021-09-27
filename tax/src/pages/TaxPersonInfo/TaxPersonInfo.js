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
import {insertTaxPersonInfo,updateTaxPersonInfo,deleteTaxPersonInfo} from "./ModelTaxPersonInfo";
import { useLocation } from "react-router-dom";
import { get } from 'lodash';
const TaxPersonInfo = () => {
  const location = useLocation();
  const history = useHistory();
  const taxPersonInfo = get(location, "state", {});
  console.log("taxPersonInfo", taxPersonInfo);
  console.log("location", location);

  const [salseId, setSalseId] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [incomeCatalogId, setIncomeCatalogId] = useState("");
  const [rdRequest, setRdRequest] = useState("");
  const [rdDate, setRdDate] = useState("");
  const [receiveCer, setReceiveCer] = useState("");
  const [status, setStatus] = useState("");

  const [depositNo, setDepositNo] = useState("");
  const [citizenId, setCitizenId] = useState("");
  const [preName, setPreName] = useState("");
  const [name, setName] = useState("");
  const [positionId, setPositionId] = useState("");
  const [positionName, setPositionName] = useState("");
  const [organizeId, setOrganizeId] = useState("");

  const [updateUser, setUpdateUser] = useState("");
  const [updateTime, setUpdateTime] = useState("");
  const [disableTime, setDisableTime] = useState(false);
  const [pressEdit, setPressEdit] = useState(false);
  const [result, setResult] = useState([]);
  let canInsert = false;
  let uUser = "9005175";
  let uTime = "25640101";

  useEffect(() => {
    fetchData();
  }, []);
  
//----------------------------for SearchAll spring boot------------------------
  const fetchData = async () => {
    console.log("fetchData taxPersonInfo fetchData", taxPersonInfo);
    console.log("fetchData location fetchData", location);
      setPressEdit(false);
      setSalseId("");
      setEmployeeType("");
      setIncomeCatalogId("");
      setRdRequest("");
      setRdDate("");
      setReceiveCer("");
      setStatus("");
      setDepositNo("");
      setCitizenId("");
      setPreName("");
      setName("");
      setPositionId("");
      setPositionName("");
      setOrganizeId("");
      setUpdateUser(uUser);
      setUpdateTime(uTime);   
  };

  //----------------------------for insert spring boot------------------------
  const insertTaxPersonInfoProcess = async (salseId, employeeType, incomeCatalogId, rdRequest, rdDate, 
    receiveCer, status, updateUser, updateTime) => {

    try
    {
        const response = await insertTaxPersonInfo(salseId, employeeType, incomeCatalogId, rdRequest, rdDate, 
          receiveCer, status, updateUser, updateTime);
    // add row ในตาราง
        setResult([...result, { salseId:salseId, employeeType:employeeType, incomeCatalogId:incomeCatalogId, 
          rdRequest:rdRequest, rdDate:rdDate, receiveCer:receiveCer, status:status, updateUser:updateUser, 
          updateTime:updateTime}]);
        alert("บันทึกข้อมูลเรียบร้อยแล้ว");
        TaxPersonInfoClear();
    }
    catch (err) 
    {  
      throw new Error("พบข้อผิดพลาดในการบันทึกข้อมูล! ",err);
    }
  };
//----------------------------for update spring boot------------------------
const updateTaxPersonInfoProcess = async (salseId, employeeType, incomeCatalogId, rdRequest, rdDate, 
  receiveCer, status, updateUser, updateTime) => {
  try
  {
    const response = await updateTaxPersonInfo(salseId, employeeType, incomeCatalogId, rdRequest, rdDate, 
      receiveCer, status, updateUser, updateTime);
    alert("แก้ไขข้อมูลเรียบร้อยแล้ว");
    TaxPersonInfoClear();
  }
  catch (err) 
  {  
    throw new Error("พบข้อผิดพลาดในการแก้ไขข้อมูล! ",err);
  }
};
  //----------------------------for delete spring boot------------------------
  const deleteTaxPersonInfoProcess = async (salseId,_processType) => {
    try
    {
      const response = await deleteTaxPersonInfo(salseId);
      setResult(result.filter((item) => item.salseId !== salseId)); //ให้แสดงข้อมูลทั้งหมดใน result โดยไม่แสดง no ที่ส่งเข้ามา
      alert("ลบข้อมูลเรียบร้อยแล้ว");
      TaxPersonInfoClear();
    }
    catch (err) 
    {  
      throw new Error("พบข้อผิดพลาดในการลบข้อมูล! ",err);
    }
  };

  const TaxPersonInfoSave = () => {
    if (salseId === "") {
      alert("กรุณากรอกรหัสประจำตัว!");
    } 
    else if(employeeType === ""){
      alert("กรุณากรอกประเภทพนักงาน!"); 
    }
    // else if(incomeCatalogId === ""){
    //   alert("กรุณากรอกประเภทเงินได้!"); 
    // }
    else if(rdRequest === ""){
      alert("กรุณากรอกคำสั่งจากสรรพกร!"); 
    }
    else if(receiveCer === ""){
      alert("กรุณากรอกช่องทางการรับทวิ!"); 
    }
    else if(status === ""){
      alert("กรุณากรอกสถานะ!"); 
    }
    else 
    {
      console.log("TaxPersonInfoSave pressEdit ", pressEdit);
        if (pressEdit) 
          updateTaxPersonInfoProcess(salseId, employeeType, incomeCatalogId, rdRequest, rdDate, 
            receiveCer, status, updateUser, updateTime);
        else 
          insertTaxPersonInfoProcess(salseId, employeeType, incomeCatalogId, rdRequest, rdDate, 
            receiveCer, status, updateUser, updateTime);

        //-----------------------------------------------------------------------
        TaxPersonInfoClear();
        setDisableTime(true);
    }
  };

const TaxPersonInfoClear = () => {
  setPressEdit(false);
  setSalseId("");
  setEmployeeType("");
  setIncomeCatalogId("");
  setRdRequest("");
  setRdDate("");
  setReceiveCer("");
  setStatus("");
  setDepositNo("");
  setCitizenId("");
  setPreName("");
  setName("");
  setPositionId("");
  setPositionName("");
  setOrganizeId("");
  // setUpdateUser("");
  // setUpdateTime("");   
  setDisableTime(true);
};
 
const dlgConfirm = async (param) => {
  if (await confirm("ต้องการลบข้อมูลใช่หรือไม่?")) 
  {
      deleteTaxPersonInfoProcess(param.salseId,"D");
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
        <h2 className={styles.title}>ข้อมูลบุคคลากร</h2>
        <br></br>
         <div>
          <table>
            <tr>
              <td>
                <InputWithLabel label="รหัสประจำตัว" value={salseId} width="300px" onChange={(e) => { setSalseId(e.target.value); }} showTime={disableTime}/>
              </td>
              <td>
                <InputWithLabel label="เลขฝากค้ำ" value={depositNo}  width="300px" onChange={(e) => { setDepositNo(e.target.value); }} showTime={disableTime}/>
              </td>
            </tr>
            <tr>
              <td>
                <InputWithLabel label="เลขประจำตัวประชาชน" value={citizenId}  width="300px" onChange={(e) => { setCitizenId(e.target.value); }}showTime={disableTime}/>
              </td>
              <td>
                <InputWithLabel label="ประเภทพนักงาน" value={employeeType}  width="300px" onChange={(e) => { setEmployeeType(e.target.value); }}showTime={disableTime}/>
              </td>
              &nbsp;
              </tr>
            <tr>
              <td>
                <InputWithLabel label="คำนำหน้า" value={preName} width="300px" onwidth="300px" onChange={(e) => { setPreName(e.target.value); }}showTime={disableTime} />
              </td>
              <td>
                <InputWithLabel label="ชื่อ - นามสกุล" value={name}  width="300px" onChange={(e) => { setName(e.target.value); }}showTime={disableTime}/>
              </td>
            </tr> 
            <tr>
              <td>
                <InputWithLabel label="รหัสตำแหน่ง" value={positionId}  width="300px" onChange={(e) => { setPositionId(e.target.value); }}showTime={disableTime} />
              </td>
              <td>
                <InputWithLabel label="ตำแหน่ง" value={positionName}  width="300px" onChange={(e) => { setPositionName(e.target.value); }}showTime={disableTime}/>
              </td>
            </tr> 
            <tr>
              <td>
                <InputWithLabel label="สถานะ" value={status}  width="300px" onChange={(e) => { setStatus(e.target.value); }}showTime={disableTime} />
              </td>
              <td>
                <InputWithLabel label="สังกัด/ส่วนงาน" value={organizeId}  width="300px" onChange={(e) => { setOrganizeId(e.target.value); }}showTime={disableTime}/>
              </td>
            </tr>

            <tr>
              <td>
                <InputWithLabel label="ช่องทางการรับทวิ" value={receiveCer}  width="300px" onChange={(e) => { setReceiveCer(e.target.value); }}showTime={disableTime}/>
              </td>
            </tr>

            <tr>
              <td>
                <InputWithLabel label="คำสั่งจากสรรพกร" value={rdRequest}  width="300px" onChange={(e) => { setRdRequest(e.target.value); }}showTime={disableTime}/>
              </td>
              <td>
                <InputWithLabel label="วันที่มีคำสั่ง" value={rdDate}  width="300px" onChange={(e) => { setRdDate(e.target.value); }}showTime={disableTime}/>
              </td>
            </tr>
            <tr>
              <td>
                <InputWithLabel label="ผู้อับเดตล่าสุด" value={updateUser}  width="300px" onChange={(e) => { setUpdateUser(e.target.value); }}showTime={disableTime}/>
              </td>
              <td>
                <InputWithLabel label="วันที่อับเดตล่าสุด" value={updateTime}  width="300px" onChange={(e) => { setUpdateTime(e.target.value); }}showTime={disableTime}/>
              </td>
            </tr>

          </table>
        </div>
        <br></br>
        <div className={styles.center}>
          <tr>
            <td>
              { <Button color="primary" type="button" onClick={TaxPersonInfoSave}>
                Save
              </Button> }
              &nbsp;&nbsp;&nbsp;
            </td>
            <td>
              <Button color="primary" type="button" onClick={() => removeData(taxPersonInfo)}>
                Delete
              </Button>
              &nbsp;&nbsp;&nbsp;
            </td>
            <td>
              <Button color="primary" type="button" onClick={() =>  TaxPersonInfoClear()}>
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
export default TaxPersonInfo;