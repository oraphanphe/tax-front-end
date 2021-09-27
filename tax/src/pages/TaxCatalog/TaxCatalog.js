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
  const TaxCatalog = (props) => {
  const [loading, setLoading] = useState(false);  
  const [taxCatalogId, setTaxCatalogId] = useState("");
  const [name, setName] = useState("");
  const [nameTh, setNameTh] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionTh, setDescriptionTh] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [status, setStatus] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [createUser, setCreateUser] = useState("");
  const [updateUser, setUpdateUser] = useState("");
  const [disableTime, setDisableTime] = useState(false);
  const [pressEdit, setPressEdit] = useState(false);
  const [result, setResult] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

    useEffect(() => {
      fetchData();
    }, []);
    
//----------------------------for SearchAll spring boot------------------------
    const fetchData = async () => {
 
    let formData = new FormData();    //formdata object
    formData.append('type', 'A');   //append the values with key, value pair
    const config = { headers: { 'content-type': 'application/json' }}

    try
    {
      console.log("result in fetchData spring >>>>>>>>>>>>>.. 1");
      const { status, data } = await apiSpring.post("/taxCatalog/search",formData,config);
      console.log("result in fetchData spring >>>>>>>>>>>>>.. 2");
      if (status === 200) {
        setResult(data); //เมื่อ setResult แล้ว ค่า result จะได้เป็นค่า arraylist ของ data สามารถนำค่า resultมาใช้ได้เลย เช่น result[0] คือ arrayตัวที่0
        console.log("result in fetchData spring >>>>>>>>>>>>>.. ",data);
      } else {
        alert("พบข้อผิดพลาดในการค้นหาข้อมูล! status ",status);
      }
    }
    catch (err) 
    {  
      alert("พบข้อผิดพลาดในการค้นหาข้อมูล! err ",err);
    }
  };
 
  const getListTaxCatalog = (taxCatalog, _index) => {
    return taxCatalog.taxCatalogId;
  };

  const taxCatalogPush= () => {
    history.push("/taxCatalog");
  }

  const taxCatalogDetail = (taxCatalog) => {
    console.log('result:'+taxCatalog+':result');
      history.push("/taxCatalogDetail", taxCatalog);
  }

  const updateItem = (taxCatalogId, whichvalue, newvalue) => {
    var index = result.findIndex((x) => x.taxCatalogId === taxCatalogId);

    let g = result[index];
    g[whichvalue] = newvalue;
    if (index === -1) {
      console.log("no match");
    } else
      setResult([...result.slice(0, index), g, ...result.slice(index + 1)]);
  };

  const renderTaxCatalog = (taxCatalog, index) => {
    return (
      <tr className={styles.title} key={index}>
        <td>{taxCatalog.taxCatalogId}</td>
        <td>{taxCatalog.name}</td>
        <td>{taxCatalog.description}</td>
        <td>{taxCatalog.status}</td>
        <td className={styles.operation}>
          <button
            className={styles.buttonEdit}
            onClick={() => taxCatalogDetail(taxCatalog)}
          >
            view
          </button>
        </td>
      </tr>
    );
  };
  return (
    <Container>
      <Wrapper>
        <br></br>
        <h2 className={styles.title}>ประเภทภาษี</h2>
        
        <div className={styles.flexend}>
          <tr>
          <td>
          <Button color="primary" type="button" onClick={() => taxCatalogDetail(null)}>
               Add
            </Button> 
            &nbsp;
          </td>
          </tr>
        </div>
        <br></br>        
        <MDBTable striped bordered scrollY hover size="sm">
          <MDBTableHead>
            <tr className={styles.head}>
              <th>รหัส</th>
              <th>ชื่อ</th>
              <th>รายละเอียด (TH)</th>
              <th>สถานะ</th>
              <th></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>{result.map(renderTaxCatalog)}</MDBTableBody>
        </MDBTable>       
      </Wrapper>
    </Container>
  );
};
export default TaxCatalog;