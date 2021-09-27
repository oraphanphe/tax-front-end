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
import {insertTaxCatalog,updateTaxCatalog,deleteTaxCatalog} from "./ModelTaxCatalog";
import { useLocation } from "react-router-dom";
import { get } from 'lodash';
const TaxCatalogDetail = () => {
  const location = useLocation();
  const history = useHistory();
  const taxCatalog = get(location, "state", {});
  console.log("taxCatalog", taxCatalog);
  console.log("location", location);
  const [taxCatalogId, setTaxCatalogId] = useState("");
  const [name, setName] = useState("");
  const [nameTh, setNameTh] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionTh, setDescriptionTh] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [status, setStatus] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [updateUser, setUpdateUser] = useState("");
  const [updateTime, setUpdateTime] = useState("");
  const [disableTime, setDisableTime] = useState(false);
  const [pressEdit, setPressEdit] = useState(false);
  const [result, setResult] = useState([]);
  let canInsert = false;
  
  const taxCatalogPush= () => {
      history.push("/taxCatalog");
  }

  useEffect(() => {
    fetchData();
  }, []);
  
//----------------------------for SearchAll spring boot------------------------
  const fetchData = async () => {  
    console.log("taxCatalog fetchData", taxCatalog);
    console.log("location fetchData", location);
    if(taxCatalog === null){
      console.log("taxCatalog fetchData NULL", taxCatalog);
      setPressEdit(false);
      setTaxCatalogId("");
      setName("");
      setNameTh("");
      setNameEn("");
      setDescription("");
      setDescriptionTh("");
      setDescriptionEn("");
      setStatus("");
      setEffectiveDate("");
      setUpdateUser("");
      setUpdateTime("");
    }
    else{
      setPressEdit(true);
      setTaxCatalogId(taxCatalog.taxCatalogId);
      setName(taxCatalog.name);
      setNameTh(taxCatalog.nameTh);
      setNameEn(taxCatalog.nameEn);
      setDescription(taxCatalog.description);
      setDescriptionTh(taxCatalog.descriptionTh);
      setDescriptionEn(taxCatalog.descriptionEn);
      setStatus(taxCatalog.status);
      setEffectiveDate(taxCatalog.effectiveDate);
      setUpdateUser(taxCatalog.updateUser);
      setUpdateTime(taxCatalog.setUpdateTime);
      console.log("taxCatalog fetchData !NULL", taxCatalog.taxCatalogId);
    }
  };

  //----------------------------for insert spring boot------------------------
  const insertTaxCatalogProcess = async (taxCatalogId, name, nameTh, nameEn, description, descriptionTh, descriptionEn, status,
     effectiveDate, updateUser, updateTime) => {
    try
    {
      const response = await insertTaxCatalog(taxCatalogId, name, nameTh, nameEn, description, descriptionTh, descriptionEn, status, effectiveDate, updateUser, updateTime);
         setResult([...result, { taxCatalogId: taxCatalogId, name: name ,nameTh:nameTh, nameEn:nameEn,
          description:description, descriptionTh:descriptionTh, descriptionEn:descriptionEn,
          status:status, effectiveDate:effectiveDate, updateUser:updateUser,
          updateTime:updateTime}]);
        alert("บันทึกข้อมูลเรียบร้อยแล้ว");
        taxCatalogPush();
    }
    catch (err) 
    {  
      throw new Error("พบข้อผิดพลาดในการบันทึกข้อมูล! ",err);
    }
  };
//----------------------------for update spring boot------------------------
  const updateTaxCatalogProcess = async (taxCatalogId, name, nameTh, nameEn, description, descriptionTh, descriptionEn, status, effectiveDate, updateUser, updateTime) => {
    try
    {
      const response = await updateTaxCatalog(taxCatalogId, name, nameTh, nameEn, description, descriptionTh, descriptionEn, status, effectiveDate, updateUser, updateTime);
       alert("แก้ไขข้อมูลเรียบร้อยแล้ว");
       taxCatalogPush();
    }
    catch (err) 
    {  
      throw new Error("พบข้อผิดพลาดในการแก้ไขข้อมูล! ",err);
    }
  };
  //----------------------------for delete spring boot------------------------
  const deleteTaxCatalogProcess = async (no,_processType) => {
    try
    {
      const response = await deleteTaxCatalog(no);
      setResult(result.filter((item) => item.no !== no)); //ให้แสดงข้อมูลทั้งหมดใน result โดยไม่แสดง no ที่ส่งเข้ามา
      alert("ลบข้อมูลเรียบร้อยแล้ว");
      taxCatalogPush();
    }
    catch (err) 
    {  
      throw new Error("พบข้อผิดพลาดในการลบข้อมูล! ",err);
    }

  };

  const TaxCatalogSave = () => {
    if (taxCatalogId === "") {
      alert("กรุณากรอกรหัส!");
    } 
    else if(name === ""){
      alert("กรุณากรอกชื่อ!"); 
    }
    else if(status === ""){
      alert("กรุณากรอกสถานะ!"); 
    }
    else if(effectiveDate === ""){
      alert("กรุณากรอกวันที่มีผล!"); 
    }
    else 
    {
        if (pressEdit) 
          updateTaxCatalogProcess(taxCatalogId, name, nameTh, nameEn, description, descriptionTh, descriptionEn, status, effectiveDate, updateUser, updateTime);
        else 
          insertTaxCatalogProcess(taxCatalogId, name, nameTh, nameEn, description, descriptionTh, descriptionEn, status, effectiveDate, updateUser, updateTime);

        //-----------------------------------------------------------------------
        TaxCatalogClear();
        setDisableTime(true);
     
    }
  };

  const TaxCatalogClear = () => {
    setPressEdit(false);
    setTaxCatalogId("");
      setName("");
      setNameTh("");
      setNameEn("");
      setDescription("");
      setDescriptionTh("");
      setDescriptionEn("");
      setStatus("");
      setEffectiveDate("");
      setUpdateUser("");
      setUpdateTime("");
  };
 
  const dlgConfirm = async (param) => {
    if (await confirm("ต้องการลบข้อมูลใช่หรือไม่?")) 
    {
        deleteTaxCatalogProcess(param.taxCatalogId,"D");
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
        <h2 className={styles.title}>ประเภทภาษี</h2>
        <br></br>
         <div>
          <table>
            <tr>
              <td>
                <InputWithLabel label="รหัส" value={taxCatalogId} onChange={(e) => {setTaxCatalogId(e.target.value); }} showTime={disableTime} />
              </td>
            </tr>
            <tr>
              <td>
                <InputWithLabel label="ชื่อ" value={name}  width="300px" onChange={(e) => { setName(e.target.value); }} showTime={disableTime}/>
              </td>
            </tr>
            <tr>
              <td>
                <InputWithLabel label="ชื่อ(TH)" value={nameTh}  width="300px" onChange={(e) => { setNameTh(e.target.value); }}showTime={disableTime}/>
              </td>
              <td>
                <InputWithLabel label="ชื่อ(EN)" value={nameEn}  width="300px" onChange={(e) => { setNameEn(e.target.value); }}showTime={disableTime}/>
              </td>
            </tr>
            <tr>
              <td>
                <InputWithLabel label="รายละเอียด" value={description}  width="300px" onChange={(e) => { setDescription(e.target.value); }}showTime={disableTime} />
              </td>
            </tr> 
            <tr>
              <td>
                <InputWithLabel label="รายละเอียด(TH)" value={descriptionTh}  width="300px" onChange={(e) => { setDescriptionTh(e.target.value); }}showTime={disableTime}/>
              </td>
            </tr> 
            <tr>
              <td>
                <InputWithLabel label="รายละเอียด(EN)" value={descriptionEn}  width="300px" onChange={(e) => { setDescriptionEn(e.target.value); }}showTime={disableTime} />
              </td>
              &nbsp;
            </tr> 
            <tr>
              <td>
                <InputWithLabel label="สถานะ" value={status}  width="300px" onChange={(e) => { setStatus(e.target.value); }}showTime={disableTime}/>
              </td>
              <td>
                <InputWithLabel label="วันที่มีผล" value={effectiveDate}  width="300px" onChange={(e) => { setEffectiveDate(e.target.value); }}showTime={disableTime} />
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
              { <Button color="primary" type="button" onClick={TaxCatalogSave}>
                Save
              </Button> }
              &nbsp;&nbsp;&nbsp;
            </td>
            <td>
              <Button color="primary" type="button" onClick={() => removeData(taxCatalog)}>
                Delete
              </Button>
              &nbsp;&nbsp;&nbsp;
            </td>
            <td>
              <Button color="primary" type="button" onClick={() =>  taxCatalogPush()}>
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
export default TaxCatalogDetail;