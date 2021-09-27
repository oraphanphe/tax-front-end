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
import {insertPersonInfo,updatePersonInfo,deletePersonInfo} from "./ModelPersonInfo";
import { useLocation } from "react-router-dom";
import { get } from 'lodash';
const PersonInfo = () => {
  const location = useLocation();
  const history = useHistory();
  const personInfo = get(location, "state", {});
  console.log("personInfo", personInfo);
  console.log("location", location);

  const [personId, setPersonId] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [citizenId, setCitizenId] = useState("");
  const [taxId, setTaxId] = useState("");
  const [socId, setSocId] = useState("");
  const [preName, setPreName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [tambon, setTambon] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
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
    
    console.log("fetchData personInfo fetchData", personInfo);
    console.log("fetchData location fetchData", location);
      setPressEdit(false);
      setPersonId("");
      setEffectiveDate("");
      setCitizenId("");
      setTaxId("");
      setSocId("");
      setPreName("");
      setFirstName("");
      setLastName("");
      setAddress("");
      setTambon("");
      setZipcode("");
      setEmail("");
      setPhone("");
      setStatus("");
      setUpdateUser(uUser);
      setUpdateTime(uTime);   
  };

  //----------------------------for insert spring boot------------------------
  const insertPersonInfoProcess = async (personId, effectiveDate, citizenId, taxId, socId, preName, 
    firstName, lastName, address, tambon, zipcode, email, phone, status, updateUser, updateTime) => {

    try
    {
        const response = await insertPersonInfo(personId, effectiveDate, citizenId, taxId, socId, 
          preName, firstName,  lastName, address, tambon, zipcode, email, phone, status, updateUser, updateTime);
    // add row ในตาราง
        setResult([...result, { personId:personId, effectiveDate:effectiveDate, citizenId:citizenId, 
          taxId:taxId, socId:socId, preName:preName, firstName:firstName, lastName:lastName, address:address,
          zipcode:zipcode, tambon:tambon, email:email, phone:phone, status:status, updateUser:updateUser, 
          updateTime:updateTime}]);
        alert("บันทึกข้อมูลเรียบร้อยแล้ว");
        PersonInfoClear();
    }
    catch (err) 
    {  
      throw new Error("พบข้อผิดพลาดในการบันทึกข้อมูล! ",err);
    }
  };
//----------------------------for update spring boot------------------------
const updatePersonInfoProcess = async (personId, effectiveDate, citizenId, taxId, socId, preName, 
  firstName, lastName, address, tambon, zipcode, email, phone, status, updateUser, updateTime) => {
  try
  {
    const response = await updatePersonInfo(personId, effectiveDate, citizenId, taxId, socId, preName, 
      firstName, lastName, address, tambon, zipcode, email, phone, status, updateUser, updateTime);
    alert("แก้ไขข้อมูลเรียบร้อยแล้ว");
    PersonInfoClear();
  }
  catch (err) 
  {  
    throw new Error("พบข้อผิดพลาดในการแก้ไขข้อมูล! ",err);
  }
};
  //----------------------------for delete spring boot------------------------
  const deletePersonInfoProcess = async (personId,_processType) => {
    try
    {
      const response = await deletePersonInfo(personId);
      setResult(result.filter((item) => item.personId !== personId)); //ให้แสดงข้อมูลทั้งหมดใน result โดยไม่แสดง no ที่ส่งเข้ามา
      alert("ลบข้อมูลเรียบร้อยแล้ว");
      PersonInfoClear();
    }
    catch (err) 
    {  
      throw new Error("พบข้อผิดพลาดในการลบข้อมูล! ",err);
    }
  };

  const PersonInfoSave = () => {

    if (effectiveDate === "") {
      alert("กรุณากรอกวันที่ลงทะเบียน!");
    } 
    else if(citizenId === ""){
      alert("กรุณากรอกเลขประจำตัวประชาชน!"); 
    }
    else if(taxId === ""){
      alert("กรุณากรอกเลขประจำผู้เสียภาษี!"); 
    }
    else if(socId === ""){
      alert("กรุณากรอกเลขประกันสังคม!"); 
    }
    else if(preName === ""){
      alert("กรุณากรอกคำนำหน้า!"); 
    }
    else if(firstName === ""){
      alert("กรุณากรอกชื่อ!"); 
    }
    else if(lastName === ""){
      alert("กรุณากรอกนามสกุล!"); 
    }
    else if(status === ""){
      alert("กรุณากรอกสถานะ!"); 
    }
    else if(effectiveDate === ""){
      alert("กรุณากรอกวันที่ลงทะเบียน!"); 
    }
    else if(address === ""){
      alert("กรุณากรอกที่อยู่!"); 
    }
    // else if(tambon === ""){
    //   alert("กรุณากรอก!"); 
    // }
    // else if(zipcode === ""){
    //   alert("กรุณากรอก!"); 
    // }
    else if(phone === ""){
      alert("กรุณากรอกเบอร์โทร!"); 
    }
    else if(email === ""){
      alert("กรุณากรอก e-mail!"); 
    }
    else 
    {
      console.log("PersonInfoSave pressEdit ", pressEdit);
        if (pressEdit) 
          updatePersonInfoProcess(personId, effectiveDate, citizenId, taxId, socId, preName, 
            firstName, lastName, address, tambon, zipcode, email, phone, status, updateUser, updateTime);
        else 
          insertPersonInfoProcess(personId, effectiveDate, citizenId, taxId, socId, preName, 
            firstName, lastName, address, tambon, zipcode, email, phone, status, updateUser, updateTime);

        //-----------------------------------------------------------------------
        PersonInfoClear();
        setDisableTime(true);
    }
  };

const PersonInfoClear = () => {
  setPressEdit(false);
  setPersonId("");
  setEffectiveDate("");
  setCitizenId("");
  setTaxId("");
  setSocId("");
  setPreName("");
  setFirstName("");
  setLastName("");
  setAddress("");
  setTambon("");
  setZipcode("");
  setPhone("");
  setStatus("");
  // setUpdateUser("");
  // setUpdateTime("");   
  setDisableTime(true);
};
 
const dlgConfirm = async (param) => {
  if (await confirm("ต้องการลบข้อมูลใช่หรือไม่?")) 
  {
      deletePersonInfoProcess(param.personId,"D");
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
        <h2 className={styles.title}>ข้อมูลบุคคลภายนอก</h2>
        <br></br>
         <div>
          <table>
            <tr>
              {/* <td>
                <InputWithLabel label="ประเภทพนักงาน" value={tax_rate_id} onChange={(e) => {setTax_rate_id(e.target.value); }} showTime={disableTime} />
              </td> */}
              <td>
                <InputWithLabel label="รหัสบุคคลภายนอก" value={personId} width="300px" onChange={(e) => { setPersonId(e.target.value); }} showTime={disableTime}/>
              </td>
              <td>
                <InputWithLabel label="เลขประจำตัวประชาชน" value={citizenId}  width="300px" onChange={(e) => { setCitizenId(e.target.value); }} showTime={disableTime}/>
              </td>
            </tr>
            <tr>
              <td>
                <InputWithLabel label="คำนำหน้า" value={preName}  width="300px" onChange={(e) => { setPreName(e.target.value); }}showTime={disableTime}/>
              </td>
              <td>
                <InputWithLabel label="ชื่อ" value={firstName}  width="300px" onChange={(e) => { setFirstName(e.target.value); }}showTime={disableTime}/>
              </td>
              </tr>
            <tr>
              <td>
                <InputWithLabel label="นามสกุล" value={lastName} width="300px" onwidth="300px" onChange={(e) => { setLastName(e.target.value); }}showTime={disableTime} />
              </td>
            </tr> 
            <tr>
              <td>
                <InputWithLabel label="เลขประจำผู้เสียภาษี" value={taxId}  width="300px" onChange={(e) => { setTaxId(e.target.value); }}showTime={disableTime}/>
              </td>
              <td>
                <InputWithLabel label="เลขประกันสังคม" value={socId}  width="300px" onChange={(e) => { setSocId(e.target.value); }}showTime={disableTime} />
              </td>
            </tr> 
            <tr>
              <td>
                <InputWithLabel label="สถานะ" value={status}  width="300px" onChange={(e) => { setStatus(e.target.value); }}showTime={disableTime}/>
              </td>
              <td>
                <InputWithLabel label="วันที่ลงทะเบียน" value={effectiveDate}  width="300px" onChange={(e) => { setEffectiveDate(e.target.value); }}showTime={disableTime} />
              </td>
            </tr>
 
            <tr>
              <td>
                <InputWithLabel label="ที่อยู่" value={address}  width="300px" onChange={(e) => { setAddress(e.target.value); }}showTime={disableTime}/>
              </td>
            </tr>

            <tr>
              <td>
                <InputWithLabel label="e-mail" value={email}  width="300px" onChange={(e) => { setEmail(e.target.value); }}showTime={disableTime}/>
              </td>
            </tr>

            <tr>
              <td>
                <InputWithLabel label="เบอร์โทร" value={phone}  width="300px" onChange={(e) => { setPhone(e.target.value); }}showTime={disableTime}/>
              </td>
            </tr>

          </table>
        </div>
        <br></br>
        <div className={styles.center}>
          <tr>
            <td>
              { <Button color="primary" type="button" onClick={PersonInfoSave}>
                Save
              </Button> }
              &nbsp;&nbsp;&nbsp;
            </td>
            <td>
              <Button color="primary" type="button" onClick={() => removeData(personInfo)}>
                Delete
              </Button>
              &nbsp;&nbsp;&nbsp;
            </td>
            <td>
              <Button color="primary" type="button" onClick={() =>  PersonInfoClear()}>
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
export default PersonInfo;